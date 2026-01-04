from google.cloud import dialogflow_v2 as dialogflow
import uuid
import os

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "config/dialogflow-key.json"

def detect_intent(text, session_id=None, language_code="en"):
    if not session_id:
        session_id = str(uuid.uuid4())

    client = dialogflow.SessionsClient()
    project_id = client.project_path(os.getenv("DIALOGFLOW_PROJECT_ID"))
    session = client.session_path(project_id, session_id)

    text_input = dialogflow.TextInput(
        text=text, language_code=language_code
    )

    query_input = dialogflow.QueryInput(text=text_input)

    response = client.detect_intent(
        request={"session": session, "query_input": query_input}
    )

    return {
        "reply": response.query_result.fulfillment_text,
        "intent": response.query_result.intent.display_name
    }
