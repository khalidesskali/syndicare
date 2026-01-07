from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import ChatbotRequestSerializer
from .services.dialogflow_service import detect_intent

class ChatbotAPIView(APIView):

    def post(self, request):
        serializer = ChatbotRequestSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user_message = serializer.validated_data["message"]

        dialogflow_response = detect_intent(user_message)

        return Response(dialogflow_response, status=status.HTTP_200_OK)
