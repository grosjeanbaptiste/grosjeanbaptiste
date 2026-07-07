"""Emit the ``site-extras.json`` sidecar that carries every DSL
construct dropped from the strict JSON Resume payload.

Consumers (the Node HTML/XML pipelines) merge these back at render
time so the rendered CV shows per-work skill lists, per-education
notes, the daily-life chart data, etc.
"""

from __future__ import annotations

from typing import Any

from nodes import (
    Resume,
)


def _work_extras(resume: Resume) -> list[dict[str, Any]]:
    out: list[dict[str, Any]] = []
    for w in resume.work:
        extras: dict[str, Any] = {}
        if w.uses:
            extras["skills"] = list(w.uses)
        if w.projects:
            extras["projects"] = [ref.target for ref in w.projects]
        if extras:
            extras["match"] = w.at or w.key
            out.append(extras)
    return out


def _education_extras(resume: Resume) -> list[dict[str, Any]]:
    out: list[dict[str, Any]] = []
    for e in resume.education:
        extras: dict[str, Any] = {}
        if e.note is not None:
            from nodes import Translated
            if isinstance(e.note, Translated):
                extras["summary"] = e.note.get("en")
            else:
                extras["summary"] = e.note
        if e.uses:
            extras["skills"] = list(e.uses)
        if e.projects:
            extras["projects"] = [ref.target for ref in e.projects]
        if extras:
            extras["match"] = e.institution or e.key
            out.append(extras)
    return out


def _project_extras(resume: Resume) -> list[dict[str, Any]]:
    """Project summary field is not in JSON Resume v1.0.0; we mirror it
    here alongside the schema-compliant description.
    """
    out: list[dict[str, Any]] = []
    for p in resume.projects:
        from nodes import Translated
        summary_val = None
        if p.summary is not None:
            if isinstance(p.summary, Translated):
                summary_val = p.summary.get("en")
            else:
                summary_val = p.summary
        if summary_val:
            out.append({"match": p.name or p.key, "summary": summary_val})
    return out


def _daily_life(resume: Resume) -> dict[str, Any] | None:
    if not resume.meta or not resume.meta.daily_life:
        return None
    return {
        "items": [
            {"key": item.key, "hours": item.hours, "color": item.color}
            for item in resume.meta.daily_life
        ]
    }


def emit(resume: Resume) -> dict[str, Any]:
    payload: dict[str, Any] = {
        "_note": "Generated from resume.grosjean by dsl/compile.py. Do not hand-edit.",
    }
    if (extras := _work_extras(resume)):
        payload["work"] = extras
    if (extras := _education_extras(resume)):
        payload["education"] = extras
    if (extras := _project_extras(resume)):
        payload["projects"] = extras
    if (daily := _daily_life(resume)) is not None:
        payload["dailyLife"] = daily
    return payload
