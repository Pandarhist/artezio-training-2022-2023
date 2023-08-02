using DisneyPrincesses.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DisneyPrincesses.Parsers
{
    public class PrincessParser : IPrincessParser
    {
        private const string InvalidEyeColor = "\n[ERROR]: Invalid eye color.\n";
        private const string InvalidHairColor = "\n[ERROR]: Invalid hair color.\n";
        private const string InvalidNumberFormat = "\n[ERROR]: Invalid princess number. Number must be a positive integer.\n";
        private const string InvalidPrincessAge = "\n[ERROR]: Invalid princess age. Age must be a positive integer.\n";
        private const string NameLessMinLength = "\n[ERROR]: Name length can't be less than {0}.\n";
        private const string NameGreaterMaxLength = "\n[ERROR]: Name length can't be greater than {0}.\n";
        private const string AgeLessMinValue = "\n[ERROR]: Age can not be less than {0}.\n";
        private const string AgeGreaterMaxValue = "\n[ERROR]: Age can not be greater than {0}.\n";
        private const int MinNameLength = 1;
        private const int MaxNameLength = 30;
        private const int MinAgeValue = 0;
        private const int MaxAgeValue = 99;

        private readonly IEnumerable<string> hairColors;
        private readonly IEnumerable<string> eyeColors;

        public PrincessParser(IEnumerable<string> validHairColors, IEnumerable<string> validEyeColors)
        {
            hairColors = validHairColors;
            eyeColors = validEyeColors;
        }

        public uint GetPrincessNumber(string value)
        {
            if (!uint.TryParse(value, out uint princessNumber))
            {
                throw new FormatException(InvalidNumberFormat);
            }

            return princessNumber;
        }

        public string GetPrincessName(string value)
        {
            var name = value.Trim();

            if (name.Length < MinNameLength)
            {
                throw new ArgumentException(string.Format(NameLessMinLength, MinNameLength));
            }

            if (name.Length > MaxNameLength)
            {
                throw new ArgumentException(string.Format(NameGreaterMaxLength, MaxNameLength));
            }

            return name;
        }

        public int GetPrincessAge(string value)
        {
            if (!int.TryParse(value, out int princessAge))
            {
                throw new ArgumentException(InvalidPrincessAge);
            }

            if (princessAge < MinAgeValue)
            {
                throw new ArgumentException(string.Format(AgeLessMinValue, MinAgeValue));
            }

            if (princessAge > MaxAgeValue)
            {
                throw new ArgumentException(string.Format(AgeGreaterMaxValue, MaxAgeValue));
            }

            return princessAge;
        }

        public string GetHairColor(string value)
        {
            var hairColor = value.Trim();

            if (!hairColors.Contains(value))
            {
                throw new ArgumentException(InvalidHairColor);
            }

            return hairColor;
        }

        public string GetEyeColor(string value)
        {
            var eyeColor = value.Trim();

            if (!eyeColors.Contains(value))
            {
                throw new ArgumentException(InvalidEyeColor);
            }

            return eyeColor;
        }
    }
}
