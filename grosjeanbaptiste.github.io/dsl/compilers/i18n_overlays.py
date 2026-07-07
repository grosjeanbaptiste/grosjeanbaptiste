"""Extract per-language overlays from every :class:`Translated` node.

Each overlay mirrors the shape of ``resume.json`` but only includes
fields whose value differs from English. Arrays are index-aligned with
the canonical, so absent entries are represented by ``null`` gaps.
"""

from __future__ import annotations

from typing import Any

from nodes import (
    Basics,
    Resume,
    Translated,
    Value,
)

TARGET_LANGS = ("fr", "nl", "es", "de", "zh")


def _tr(v: Value | None, lang: str) -> str | None:
    if isinstance(v, Translated):
        return v.get(lang, fallback="") or None
    return None


def _basics_overlay(b: Basics, lang: str) -> dict[str, Any] | None:
    entry: dict[str, Any] = {}
    if (val := _tr(b.label, lang)) is not None:
        entry["label"] = val
    if (val := _tr(b.summary, lang)) is not None:
        entry["summary"] = val
    return entry or None


def _work_overlay(w, lang: str) -> dict[str, Any] | None:
    entry: dict[str, Any] = {}
    if (val := _tr(w.position, lang)) is not None:
        entry["position"] = val
    if (val := _tr(w.summary, lang)) is not None:
        entry["summary"] = val
    if w.highlights:
        hl = [_tr(h, lang) for h in w.highlights]
        if any(h is not None for h in hl):
            entry["highlights"] = hl
    return entry or None


def _education_overlay(e, lang: str) -> dict[str, Any] | None:
    entry: dict[str, Any] = {}
    if (val := _tr(e.note, lang)) is not None:
        entry["note"] = val
    return entry or None


def _project_overlay(p, lang: str) -> dict[str, Any] | None:
    entry: dict[str, Any] = {}
    if (val := _tr(p.description, lang)) is not None:
        entry["description"] = val
    if (val := _tr(p.summary, lang)) is not None:
        entry["summary"] = val
    return entry or None


def _reference_overlay(r, lang: str) -> dict[str, Any] | None:
    entry: dict[str, Any] = {}
    if (val := _tr(r.quote, lang)) is not None:
        entry["reference"] = val
    return entry or None


def _award_overlay(a, lang: str) -> dict[str, Any] | None:
    entry: dict[str, Any] = {}
    if (val := _tr(a.title, lang)) is not None:
        entry["title"] = val
    if (val := _tr(a.summary, lang)) is not None:
        entry["summary"] = val
    return entry or None


def _interest_overlay(i, lang: str) -> dict[str, Any] | None:
    entry: dict[str, Any] = {}
    if (val := _tr(i.name, lang)) is not None:
        entry["name"] = val
    return entry or None


def _volunteer_overlay(v, lang: str) -> dict[str, Any] | None:
    entry: dict[str, Any] = {}
    if (val := _tr(v.position, lang)) is not None:
        entry["position"] = val
    if (val := _tr(v.summary, lang)) is not None:
        entry["summary"] = val
    return entry or None


def _list_overlay(entries, extract_fn, lang: str) -> list[Any] | None:
    if not entries:
        return None
    out = [extract_fn(e, lang) or {} for e in entries]
    # Drop trailing empty dicts to keep overlays compact.
    while out and out[-1] == {}:
        out.pop()
    return out or None


def emit_for_lang(resume: Resume, lang: str) -> dict[str, Any]:
    overlay: dict[str, Any] = {}
    if resume.basics:
        if (b := _basics_overlay(resume.basics, lang)):
            overlay["basics"] = b
    for section, entries, fn in [
        ("work", resume.work, _work_overlay),
        ("education", resume.education, _education_overlay),
        ("projects", resume.projects, _project_overlay),
        ("references", resume.references, _reference_overlay),
        ("awards", resume.awards, _award_overlay),
        ("interests", resume.interests, _interest_overlay),
        ("volunteer", resume.volunteer, _volunteer_overlay),
    ]:
        if (val := _list_overlay(entries, fn, lang)) is not None:
            overlay[section] = val
    return overlay


def emit(resume: Resume) -> dict[str, dict[str, Any]]:
    return {lang: emit_for_lang(resume, lang) for lang in TARGET_LANGS}
