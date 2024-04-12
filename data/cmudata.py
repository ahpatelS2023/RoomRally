import datetime
import os.path
import csv

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"]

# Define the calendar IDs
calendar_ids = [
    "west.cmu.edu_2d34383337323335352d383031@resource.calendar.google.com",
    "west.cmu.edu_2d34383231323435382d333231@resource.calendar.google.com",
    "c_188dqu93ks628hq1ncd7m3euj8s0s@resource.calendar.google.com",
    "west.cmu.edu_3634303838363838313536@resource.calendar.google.com",
    "west.cmu.edu_35363936313337362d363937@resource.calendar.google.com",
]

def main():
    creds = None
    start_date = datetime.datetime(2023, 1, 1).isoformat() + "Z"
    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                "client.json", SCOPES
            )
            creds = flow.run_local_server(port=0)
        with open("token.json", "w") as token:
            token.write(creds.to_json())

    try:
        service = build("calendar", "v3", credentials=creds)

        # Initialize a list to store events
        all_events = []

        # Iterate over calendar IDs
        for calendar_id in calendar_ids:
            events_result = service.events().list(
                calendarId=calendar_id,
                timeMin=start_date,
                timeMax=datetime.datetime.utcnow().isoformat() + "Z",  # Current date and time
                singleEvents=True,
                orderBy="startTime",
            ).execute()
            events = events_result.get("items", [])
            
            # Append events to the list
            all_events.extend(events)

        # Define the fields for the CSV file
        fieldnames = ['Event Title', 'Start Time', 'End Time', 'Attendees', 'Room', 'Description', 'Canceled']

        # Write events to CSV file
        with open('calendar_events.csv', 'w', newline='') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            for event in all_events:
                start = event.get('start', {}).get('dateTime', event.get('start', {}).get('date'))
                end = event.get('end', {}).get('dateTime', event.get('end', {}).get('date'))
                attendees = event.get('attendees', [])
                attendee_emails = [attendee['email'] for attendee in attendees] if attendees else ''
                room = event.get('location', '')
                description = event.get('description', '')
                canceled = 'FALSE'
                writer.writerow({
                    'Event Title': event.get('summary', ''),
                    'Start Time': start,
                    'End Time': end,
                    'Attendees': ', '.join(attendee_emails),
                    'Room': room,
                    'Description': description,
                    'Canceled': canceled
                })

        print("Events written to calendar_events.csv")

    except HttpError as error:
        print(f"An error occurred: {error}")

if __name__ == "__main__":
    main()
