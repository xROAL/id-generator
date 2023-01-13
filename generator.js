const WEIGHTS = [7, 3, 1];
const EMPTY_CHAR = "<";
const DOCUMENT_NAME = `GENERATED${EMPTY_CHAR.repeat(2)}SPECIMEN`;

/**
 * @param {string} value
 * @param {number} length
 * @returns {string}
 */
const mrzValue = (value, length) =>
  value.toUpperCase().slice(0, length).padEnd(length, EMPTY_CHAR);

/**
 * @param {string} value
 * @returns {number}
 */
const checkDigit = (value) =>
  [...value].reduce((result, char, ix) => {
    const v = parseInt(char === EMPTY_CHAR ? "0" : char, 36);
    const weight = WEIGHTS[ix % WEIGHTS.length];

    return (result + v * weight) % 10;
  }, 0);

/**
 * @param {{
 *  documentType: string;
 *  issuedByCountry: string;
 *  documentCode: string;
 *  extra1: string;
 *  dateOfBirth: string;
 *  gender: string;
 *  expirationDate: string;
 *  nationality: string;
 *  extra2: string;
 * }} options
 */
export const generateMrz = ({
  documentType = "",
  issuedByCountry = "",
  documentCode = "",
  extra1 = "",
  dateOfBirth = "",
  gender = "",
  expirationDate = "",
  nationality = "",
  extra2 = "",
} = {}) => {
  const documentTypeMrz = mrzValue(documentType, 2);

  const issuedByCountryMrz = mrzValue(issuedByCountry, 3);

  const documentCodeMrz = mrzValue(documentCode, 9);
  const documentCodeCheck = checkDigit(documentCodeMrz);

  const extra1Mrz = mrzValue(extra1, 15);

  const dateOfBirthMrz = mrzValue(dateOfBirth, 6);
  const dateOfBirthCheck = checkDigit(dateOfBirthMrz);

  const genderMrz = mrzValue(gender, 1);

  const expirationDateMrz = mrzValue(expirationDate, 6);
  const expirationDateCheck = checkDigit(expirationDateMrz);

  const nationalityMrz = mrzValue(nationality, 3);

  const extra2Mrz = mrzValue(extra2, 11);

  const nameMrz = mrzValue(DOCUMENT_NAME, 30);

  const cumulativeMrzValue = [
    documentCodeMrz,
    documentCodeCheck,
    extra1Mrz,
    dateOfBirthMrz,
    dateOfBirthCheck,
    expirationDateMrz,
    expirationDateCheck,
    extra2Mrz,
  ].join("");

  const cumulativeCheck = checkDigit(cumulativeMrzValue);

  return {
    documentType: documentTypeMrz,
    issuedByCountry: issuedByCountryMrz,
    documentCode: documentCodeMrz,
    documentCodeCheck,
    extra1: extra1Mrz,
    dateOfBirth: dateOfBirthMrz,
    dateOfBirthCheck,
    gender: genderMrz,
    expirationDate: expirationDateMrz,
    expirationDateCheck,
    nationality: nationalityMrz,
    extra2: extra2Mrz,
    cumulativeValue: cumulativeMrzValue,
    cumulativeCheck,
    name: nameMrz,
    toLines() {
      return [
        [
          this.documentType,
          this.issuedBy,
          this.documentCode,
          this.documentCodeCheck,
          this.extra1,
        ].join(""),
        [
          this.dateOfBirth,
          this.dateOfBirthCheck,
          this.gender,
          this.expirationDate,
          this.expirationDateCheck,
          this.nationality,
          this.extra2,
          this.cumulativeCheck,
        ].join(""),
        this.name,
      ];
    },
    toString() {
      return this.toLines().join("");
    },
  };
};
