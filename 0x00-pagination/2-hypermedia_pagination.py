#!/usr/bin/env python3
"""
This module contains a method get_page
that takes two integer arguments page
with default value 1 and page_size
with default value 10
"""

import csv
import math
from typing import Dict, List, Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    this method takes two args and returns tuple of size two
    containing the start and end indices corresponding to
    he range of indices to return in a list
    for those particular pagination parameters
    Args:
        page(int): page number to return
        page_size(int): number of items per page
    Return: tuple(start, end)
    """
    start = 0
    end = 0
    for i in range(page):
        start = end
        end += page_size

    return (start, end)


class Server:
    """
    Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """
        Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        this function takes 2 int args page = 1 and
        page_size = 10 and
        return appropriate page of the dataset
        Args:
            page(int): requested page (must be positive value > 0)
            page_size(int): number of items per page(must be postive value > 0)
        Return:
            list of list containing required data
        """
        assert type(page) == int and type(page_size) == int and\
            page > 0 and page_size > 0
        data = self.dataset()
        try:
            index = index_range(page, page_size)
            return data[index[0]: index[1]]
        except IndexError:
            return []

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict:
        """
        this function takes 2 int args and
        return a dict containing these
        key-value pairs
        Args:
            page(int): requested page
            page_size(int): number of items per page
        Return:
            dict with key-value pairs
        """
        total_records = self.dataset()
        data = self.get_page(page, page_size)
        total_pages = math.ceil(len(total_records) / page_size)
        if data == []:
            page_size = 0
        next_page = page + 1 if page + 1 <= total_pages else None
        prev_page = page - 1 if page > 1 else None

        new_dict = {
            "page_size": len(data),
            "page": page,
            "data": data,
            "next_page": next_page,
            "prev_page": prev_page,
            "total_pages": total_pages
        }
        return new_dict
