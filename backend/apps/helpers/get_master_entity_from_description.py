from typing import Union
import re
from re import sub, compile, escape


class IdentifierError(Exception):
    pass


class NationalIdentifier:
    def __init__(self, rut: Union[str, int], check_dv=False):
        """
        Initialize with Chilean RUT (national ID)
        Args:
            rut: RUT number with or without verification digit
            check_dv: Whether to validate the verification digit
        """
        self._rut = str(rut).replace(".", "").replace(" ", "")
        self.validate_rut(check_dv)

    def __repr__(self) -> str:
        return self._rut

    def validate_rut(self, check_dv):
        self.check_valid_rut(self.rut, check_dv)

    @property 
    def rut(self):
        return self._rut

    @rut.setter
    def rut(self, new_rut):
        self._rut = str(new_rut).replace(".", "").replace(" ", "")
        self.check_valid_rut(self.rut)

    @staticmethod
    def calculate_verificator(rut_number: str) -> str:
        """Calculate verification digit for Chilean RUT"""
        reversed_digits = map(int, reversed(str(rut_number)))
        factors = (2, 3, 4, 5, 6, 7)
        s = sum(d * f for d, f in zip(reversed_digits, (factors * 5)[:len(rut_number)]))
        verificator = (-s) % 11
        return "K" if verificator == 10 else str(verificator if verificator < 10 else 0)

    @classmethod
    def check_valid_rut(cls, rut: str, check_dv: bool = False):
        """Validate Chilean RUT format and optionally its verification digit"""
        matching = re.match(r"^\d{6,8}-?[\dkK]?$", rut)
        if not matching:
            raise IdentifierError(f"Invalid RUT format: {rut}")
        if check_dv:
            without_verificator, dv = rut.split("-")
            if dv.upper() != cls.calculate_verificator(without_verificator):
                raise IdentifierError(f"Invalid verification digit for RUT: {rut}")

    @classmethod
    def from_description(cls, description: str) -> Union[None, 'NationalIdentifier']:
        """Extract and validate Chilean RUT from text description"""
        rut = sub("[^0123456789kK]", "", description).replace("K", "k").lstrip("0")
        rut = compile(escape("k") + "+").sub("k", rut)
        
        try:
            return cls(f"{rut[:-1]}-{rut[-1:]}", check_dv=True)
        except IdentifierError:
            try:
                return cls(rut)
            except IdentifierError:
                return None


def retrieve_national_identifier_from_description(description: str) -> Union[None, NationalIdentifier]:
    """Search for Chilean RUT in different parts of the description"""
    national_identifier = NationalIdentifier.from_description(description[:14])
    if national_identifier:
        return national_identifier
    return NationalIdentifier.from_description(description[14:])
