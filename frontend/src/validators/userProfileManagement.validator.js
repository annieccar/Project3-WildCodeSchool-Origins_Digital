const registerOptions = {
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
  email: {
    required: "An email must be registered.",
    pattern: {
      value: /^[a-z0-9.-_]+@[a-z]+\.[a-z]{2,4}$/gi,
      message:
        'Registered email has the wrong format. It must resemble "johndoe@example.com."',
    },
  },
};

export default registerOptions;
