from http import HTTPStatus

from flask import render_template, request, make_response

from app import db
from app.models.preset import Preset
from app.presets import bp


@bp.route("/")
def index():
    presets = Preset.query.all()
    return render_template("presets/index.html", presets=presets)


@bp.route("/new")
def create():
    preset = Preset(creator_id=int(request.json["creator_id"]))
    if request.json["name"]:
        preset.name = request.json["name"]
    if request.json["data"]:
        preset.data = request.json["data"]
    if request.json["isPublic"]:
        preset.isPublic = int(request.json["isPublic"])
    db.session.add(preset)
    db.session.commit()
    return make_response("Preset successfully created/updated")


@bp.route("/<preset>", methods=["GET", "DELETE", "POST"])
def modify_preset(preset_id):
    preset = Preset.query.filter_by(preset_id=preset_id)
    if preset is None:
        return make_response("Preset not found", HTTPStatus.NOT_FOUND)
    if request.method == "GET":
        return make_response(preset, HTTPStatus.OK)
    elif request.method == "DELETE":
        db.session.delete(preset)
        db.session.commit()
        return make_response("Successfully deleted preset", HTTPStatus.OK)
    elif request.method == "POST":
        if request.json["name"]:
            preset.name = request.json["name"]
        if request.json["data"]:
            preset.data = request.json["data"]
        if request.json["isPublic"]:
            preset.isPublic = int(request.json["isPublic"])
        db.session.commit()
        return make_response("Successfully updated preset", HTTPStatus.OK)


@bp.route("/all")
def get_presets():
    presets = Preset.query.all()
    return make_response(presets, HTTPStatus.OK)


@bp.route("/public")
def get_public_presets():
    presets = Preset.query.all()
    public_presets = []
    for preset in presets:
        if preset.isPublic:
            public_presets.append(preset)
    return make_response(public_presets, HTTPStatus.OK)
