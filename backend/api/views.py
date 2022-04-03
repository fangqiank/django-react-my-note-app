from django.shortcuts import render
# from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
# from django.views.decorators.csrf import csrf_exempt
from .models import Note
from .serializers import NoteSerializer
from .utils import notesList, singleNote, createNote, updateNote, deleteNote


@api_view(['GET'])
def getRoutes(req):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]

    return Response(routes)


@api_view(['GET','POST'])
def getNotes(req):
    if req.method == 'GET':
        return notesList(req)

    if req.method == 'POST':
        return createNote(req)


@api_view(['GET', 'DELETE', 'PUT'])
def getNote(req, pk):
    if req.method == 'GET':
        return singleNote(req, pk)

    if req.method == 'PUT':
        return updateNote(req, pk)

    if req.method == 'DELETE':
        return deleteNote(req, pk)


