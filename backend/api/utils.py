from rest_framework.response import Response
from .models import Note
from .serializers import NoteSerializer


def notesList(req):
    notes = Note.objects.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


def singleNote(req, pk):
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)


def createNote(req):
    data = req.data
    note = Note.objects.create(
        title=data['title'],
        body=data['body']
    )
    serializer = NoteSerializer(note, many=False)
    # if serializer.is_valid():
    #     serializer.save()

    return Response(serializer.data)


def updateNote(req, pk):
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(instance=note, data=req.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


def deleteNote(req, pk):
    note = Note.objects.get(id=pk)
    note.delete()

    return Response('note was deleted')