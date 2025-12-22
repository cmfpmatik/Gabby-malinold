# Copyright 2024-2025 Vincent Jacques <vincent@vincent-jacques.net>

from typing import Annotated

from fastapi import Depends, Request


class UrlsBuilder:
    def __init__(self, request: Request):
        self.request = request

    def make(self, name, **kwargs):
        return str(self.request.url_for(name, **kwargs))


Urls = Annotated[UrlsBuilder, Depends()]
