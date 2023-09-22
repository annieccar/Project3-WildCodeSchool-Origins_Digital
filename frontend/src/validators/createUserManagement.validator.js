export function giveTodayDate() {
  const date = new Date();
  let month = date.getMonth().toString();
  if (month.length === 1) {
    month = "0".concat(month);
  }
  let day = date.getDate().toString();
  if (day.length === 1) {
    day = "0".concat(day);
  }
  return `${date.getFullYear()}-${month}-${day}`;
}

export const registerOptions = {
  username: {
    required: "An username must be registered.",
    pattern: {
      value: /[a-z0-9éèàëñçù^*+'\\"=²&§$¤€£<>()|%°.-_@]/gi,
      message: "Registered username contains forbidden characters.",
    },
    minLength: {
      value: 3,
      message: "An username must have at least 3 characters.",
    },
    maxLength: {
      value: 64,
      message: "An username must have less than 64 characters.",
    },
  },
  firstname: {
    required: "A firstname must be registered.",
    pattern: {
      value: /[a-z0-9éèàëñçù]/gi,
      message: "Registered firstname contains forbidden characters.",
    },
    minLength: {
      value: 2,
      message: "A firstname must have at least 2 characters.",
    },
    maxLength: {
      value: 64,
      message: "A firstname must have less than 64 characters.",
    },
  },
  lastname: {
    required: "A lastname must be registered.",
    pattern: {
      value: /[a-z0-9éèàëñçù]/gi,
      message: "Registered lastname contains forbidden characters.",
    },
    minLength: {
      value: 2,
      message: "A lastname must have at least 2 characters.",
    },
    maxLength: {
      value: 64,
      message: "A lastname must have less than 64 characters.",
    },
  },
  birthdate: {
    required: "A birthdate must be registered.",
    validate: (value) =>
      (value > "1900-01-01" && value < giveTodayDate()) ||
      "Your birthdate must be posterior to January 1st, 1900.",
  },
  gender: {
    required: "A gender must be registered.",
  },
  email: {
    required: "An email must be registered.",
    pattern: {
      value: /^[a-z0-9.-_]+@[a-z]+\.[a-z]{2,4}$/gi,
      message:
        'Registered email has the wrong format. It must resemble "johndoe@example.com."',
    },
  },
  password: {
    required: "A password must be registered.",
    minLength: {
      value: 8,
      message: "A valid password must have at least 8 characters.",
    },
    maxLength: {
      value: 64,
      message: "A valid password must have less than 64 characters.",
    },
  },
};
