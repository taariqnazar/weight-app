FROM python:3-buster

WORKDIR /app

COPY . .
COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

CMD python app2.py

