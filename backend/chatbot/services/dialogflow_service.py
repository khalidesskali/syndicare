from google.cloud import dialogflow_v2 as dialogflow
from google.oauth2 import service_account
import os

# Absolute path to this file
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

# chatbot/credentials/dialogflow.json
CREDENTIALS_PATH = os.path.join(
    CURRENT_DIR,
    "..",
    "credentials",
    "dialogflow.json"
)

CREDENTIALS_PATH = os.path.abspath(CREDENTIALS_PATH)

PROJECT_ID = "syndic-app-483314"


def detect_intent(text, session_id="test-session", language_code="en"):

    credentials = service_account.Credentials.from_service_account_file(
        CREDENTIALS_PATH
    )

    session_client = dialogflow.SessionsClient(credentials=credentials)

    session = session_client.session_path(PROJECT_ID, session_id)

    text_input = dialogflow.TextInput(
        text=text,
        language_code=language_code
    )

    query_input = dialogflow.QueryInput(text=text_input)

    response = session_client.detect_intent(
        request={"session": session, "query_input": query_input}
    )

    return {
        "intent": response.query_result.intent.display_name,
        "confidence": response.query_result.intent_detection_confidence,
        "reply": response.query_result.fulfillment_text,
    }
