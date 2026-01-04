from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..chatbot.services.dialogflow_service import detect_intent

@api_view(["POST"])
def chatbot_message(request):
    user_message = request.data.get("message")

    if not user_message:
        return Response({"error": "Message required"}, status=400)

    result = detect_intent(user_message)

    return Response(result)
