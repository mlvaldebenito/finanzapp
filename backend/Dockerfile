FROM python:3.10.8-slim
RUN cat /etc/os-release
ENV PYTHONUNBUFFERED 1
ARG BUILD_ENV
ENV BUILD_ENV=${BUILD_ENV}
EXPOSE 8000
RUN apt-get update -y && apt-get upgrade -y && apt-get install python3-dev wkhtmltopdf g++ tk gcc -y
RUN mkdir /code
WORKDIR /code
COPY poetry_conditional.sh ./
RUN chmod +x poetry_conditional.sh && pip install --upgrade pip && pip install poetry==1.4.2 && poetry config virtualenvs.create false
COPY pyproject.toml poetry.lock ./
RUN ./poetry_conditional.sh
COPY . .
