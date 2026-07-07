// Untuk memvalidasi apakah input sesuai dengan kriteria
export const validateDiabetesForm = (formdata) => {
    const errors = {};
    for (const [key, value] of Object.entries(formdata)) {
        if (
            value === null ||
            value === undefined ||
            String(value).trim() === ""
        ) {
            errors[key] = "Field ini harus diisi";
            continue;
             }

        const number= Number(value);

        if (Number.isNaN(number)) {
            errors[key]= "Harus berupa angka";
        } else if (number <0) {
            errors[key]= "Tidak boleh negatif";
        }
    }

    return errors;
};