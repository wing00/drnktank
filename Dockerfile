FROM python
ENV PYTHONUNBUFFERED 1
RUN mkdir /drnktank
WORKDIR /drnktank

ENV NODE_VERSION 7.5.0
RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" \
  && tar -xJf "node-v$NODE_VERSION-linux-x64.tar.xz" -C /usr/local --strip-components=1 \
  && rm "node-v$NODE_VERSION-linux-x64.tar.xz" \
  && ln -s /usr/local/bin/node /usr/local/bin/nodejs


ADD package.json /drnktank/
RUN npm install

ADD requirements.txt /drnktank/
RUN pip install -r requirements.txt

ADD . /drnktank/

ENV DJANGO_SETTINGS_MODULE=drnktank.settings
