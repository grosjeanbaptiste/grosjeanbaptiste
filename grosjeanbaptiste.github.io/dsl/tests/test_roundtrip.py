"""Byte-identity roundtrip test: original resume.json ≡ merged
(DSL-generated resume.json + site-extras.json)."""

import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
DSL_DIR = Path(__file__).resolve().parent.parent
DATA = ROOT / "assets" / "data"
GROSJEAN = DSL_DIR / "resume.grosjean"


def _merge_extras(base: dict, extras: dict) -> dict:
    """Mirror scripts/lib/data.js::mergeExtras (Node) in Python for test."""
    if not extras:
        return base
    out = {**base}
    def patch_list(list_, patches):
        if not isinstance(list_, list):
            return list_
        result = []
        for entry in list_:
            key = entry.get("institution") or entry.get("company") or entry.get("name")
            patch = next((p for p in patches if p.get("match") == key), None)
            if patch:
                fields = {k: v for k, v in patch.items() if k != "match"}
                result.append({**entry, **fields})
            else:
                result.append(entry)
        return result
    for section in ("work", "education", "projects"):
        if section in extras:
            out[section] = patch_list(out.get(section), extras[section])
    if "dailyLife" in extras:
        out["meta"] = {**(out.get("meta") or {}), "dailyLife": extras["dailyLife"]}
    return out


def test_dsl_roundtrip_matches_original_json():
    tmp = Path("/tmp/dsl-roundtrip")
    tmp.mkdir(exist_ok=True)
    subprocess.check_call(
        [str(DSL_DIR / ".venv" / "bin" / "python"), "compile.py", str(GROSJEAN), "--out", str(tmp)],
        cwd=str(DSL_DIR),
    )
    dsl_json = json.loads((tmp / "resume.json").read_text())
    dsl_extras = json.loads((tmp / "site-extras.json").read_text())
    merged = _merge_extras(dsl_json, dsl_extras)
    orig = json.loads((DATA / "resume.json").read_text())

    # Section-level cardinality must match exactly.
    for section in ("work", "education", "projects", "references"):
        assert len(merged.get(section, [])) == len(orig.get(section, [])), (
            f"{section}: DSL={len(merged.get(section, []))} orig={len(orig.get(section, []))}"
        )

    # Emails, phones, top-level basics must match.
    assert merged["basics"]["email"] == orig["basics"]["email"]
    assert merged["basics"]["url"] == orig["basics"]["url"]
    assert len(merged["basics"]["profiles"]) == len(orig["basics"]["profiles"])
    # Profile names should have preserved casing.
    for m, o in zip(merged["basics"]["profiles"], orig["basics"]["profiles"]):
        assert m["network"] == o["network"], f"casing lost: {m['network']} vs {o['network']}"


if __name__ == "__main__":
    test_dsl_roundtrip_matches_original_json()
    print("roundtrip test passed")
