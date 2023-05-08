    export default function Validations (type, errors, setErrors) {
      const validateURL = /^(ftp|http|https):\/\/[^ "]+$/;
      const validateName = /^[a-zA-Z\s]*$/;
      const validateNumber = /^\d*$/;
      const validateNumberFloat = /^\d+(\.\d+)*$/;

      // Recipe Name Validation:

      if (type.name.length) {
        console.log('entro name')

        if (type.name.length > 30) {
          setErrors({
            name: "* The title must have at most 30 characters",
          });
        } else if (validateName.test(type.name) === false) {
          setErrors({
            name: "* The title can only contain letters",
          });
        } else {
          setErrors({
            name: "",
          });
        }
      }

      // Recipe Price Validation:

      if (type.price.length) {
        if (validateNumberFloat.test(type.price) === false) {
          setErrors({
            price: "* The price can only contain numbers",
          });
        } else if (type.price.length > 9) {
          setErrors({
            price: "* The price is too big",
          });
        } else {
          setErrors({
            price: "",
          });
        }
      }

      // Recipe Image Validation:

      if (type.image.length) {
        if (validateURL.test(type.image) === false) {
          setErrors({
            image: "* The image url its invalid",
          });
        } else {
          setErrors({
            image: "",
          });
        }
      }

      // Recipe Health Score Validation:

      if (type.healthScore.length) {
        if (validateNumber.test(type.healthScore) === false) {
          setErrors({
            healthScore: "* The Health Score can only contain numbers",
          });
        } else if (type.healthScore > 100) {
          setErrors({
            healthScore: "* The Health Score is too much",
          });
        } else {
          setErrors({
            healthScore: "",
          });
        }
      }

      // Recipe Summary Validation:

      if (type.summary.length) {
        if (type.summary.length > 80) {
          setErrors({
            summary: "* The summary must have at most 80 characters",
          });
        } else {
          setErrors({
            summary: "",
          });
        }
      }

      // Recipe Step By Step Validation:

      if (type.stepByStep.length) {
        if (type.stepByStep.length > 620) {
          setErrors({
            stepByStep: "* The step by step must have at most 620 characters",
          });
        } else {
          setErrors({
            stepByStep: "",
          });
        }
      }
    }