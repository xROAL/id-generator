import { generateMrz } from "./generator.js";

const FIELD_CLASSES = ["bg-sky-600", "ring-sky-600"];
const CHECK_CLASSES = ["bg-emerald-500", "ring-emerald-500"];
const TRANSPARENT_CLASSES = ["bg-transparent", "ring-transparent"];

/** @param {string} id */
const getField = (id) => {
  const input = document.querySelector(`#${id}`);
  const output = document.querySelector(`#res-${id}`);
  const check = document.querySelector(`#res-${id}-check`);

  return {
    get input() {
      return input;
    },
    /** @returns {string} */
    get value() {
      return input?.value;
    },
    /** @param {string} value */
    set result(value) {
      if (output) {
        output.innerText = value;
      }
    },
    /** @param {number} value */
    set check(value) {
      if (check) {
        check.innerText = value;
      }
    },
    blur() {
      output?.classList.remove(...FIELD_CLASSES);
      output?.classList.add(...TRANSPARENT_CLASSES);

      check?.classList.remove(...CHECK_CLASSES);
      check?.classList.add(...TRANSPARENT_CLASSES);
    },
    focus() {
      output?.classList.remove(...TRANSPARENT_CLASSES);
      output?.classList.add(...FIELD_CLASSES);

      check?.classList.remove(...TRANSPARENT_CLASSES);
      check?.classList.add(...CHECK_CLASSES);
    },
  };
};

const documentType = getField("document-type");
const issuedByCountry = getField("issued-by-country");
const documentCode = getField("document-code");
const extra1 = getField("extra-1");
const dateOfBirth = getField("date-of-birth");
const gender = getField("gender");
const expirationDate = getField("expiration-date");
const nationality = getField("nationality");
const extra2 = getField("extra-2");
const cumulative = getField("cumulative");
const name = getField("name");

const setMrzDisplay = () => {
  const mrz = generateMrz({
    documentType: documentType.value,
    issuedByCountry: issuedByCountry.value,
    documentCode: documentCode.value,
    extra1: extra1.value,
    dateOfBirth: dateOfBirth.value,
    gender: gender.value,
    expirationDate: expirationDate.value,
    nationality: nationality.value,
    extra2: extra2.value,
  });

  documentType.result = mrz.documentType;
  issuedByCountry.result = mrz.issuedByCountry;
  documentCode.result = mrz.documentCode;
  documentCode.check = mrz.documentCodeCheck;
  extra1.result = mrz.extra1;
  dateOfBirth.result = mrz.dateOfBirth;
  dateOfBirth.check = mrz.dateOfBirthCheck;
  gender.result = mrz.gender;
  expirationDate.result = mrz.expirationDate;
  expirationDate.check = mrz.expirationDateCheck;
  nationality.result = mrz.nationality;
  extra2.result = mrz.extra2;
  cumulative.check = mrz.cumulativeCheck;
  name.result = mrz.name;
};

[
  documentType,
  issuedByCountry,
  documentCode,
  extra1,
  dateOfBirth,
  gender,
  expirationDate,
  nationality,
  extra2,
].forEach((field) => {
  field.input.addEventListener("input", () => setMrzDisplay());
  field.input.addEventListener("focus", () => field.focus());
  field.input.addEventListener("blur", () => field.blur());
});

setMrzDisplay();
