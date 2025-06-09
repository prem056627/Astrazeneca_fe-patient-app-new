import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';
import imageCompression from 'browser-image-compression';
// import forEach from 'lodash/forEach';
// import isEmpty from 'lodash/isEmpty';
export function transformToFormData(
	data,
	formData = new FormData(),
	parentKey = null
) {
	// console.log(data);
	forEach(data, (value, key) => {
		if (value === null) return; // else "null" will be added

		let formattedKey = isEmpty(parentKey) ? key : `${parentKey}[${key}]`;

		if (value instanceof File) {
			formData.set(formattedKey, value);
		} else if (value instanceof Array) {
			forEach(value, (ele) => {
				if (ele instanceof Object) {
					formData.append(`${formattedKey}`, JSON.stringify(ele));
				} else {
					formData.append(`${formattedKey}`, ele);
				}
			});
		} else if (value instanceof Object) {
			transformToFormData(value, formData, formattedKey);
		} else {
			formData.set(formattedKey, value);
		}
	});
	return formData;
}

export function transformToFormDataOrder(
	data,
	formData = new FormData(),
	parentKey = null
) {
	// console.log(data);
	forEach(data, (value, key) => {
		if (value === null) return; // else "null" will be added

		let formattedKey = isEmpty(parentKey) ? key : `${parentKey}[${key}]`;

		if (value instanceof File) {
			formData.set(formattedKey, value);
		} else if (value instanceof Array) {
			formData.set(formattedKey, JSON.stringify(value));
		} else if (value instanceof Object) {
			transformToFormData(value, formData, formattedKey);
		} else {
			formData.set(formattedKey, value);
		}
	});
	return formData;
}

export function transformToDynamicFormData(
	data,
	formData = new FormData(),
	parentKey = null
) {
	let tempData = data;
	forEach(tempData, (value, key) => {
		if (value === null) return; // else "null" will be added

		if (value instanceof File) {
			formData.set(key, value);
			if (key) {
				delete tempData[key];
			}
		}
	});

	formData.set('data', JSON.stringify(tempData));
	return formData;
}

export const handleFileUpload = async (event, formik, formik_field) => {
	const imageFile = event.target.files[0];

	const options = {
		maxSizeMB: 1,
		maxWidthOrHeight: 1920,
		useWebWorker: true,
	};
	try {
		const compressedFile = await imageCompression(imageFile, options);
		formik.setFieldValue(formik_field, compressedFile);
	} catch (error) {
		console.log(error);
	}
};




export function transformToPatientEnrollmentDetailsFormData(
    data,
    formData = new FormData(),
    parentKey = null
) {
    forEach(data, (value, key) => {

		// console.log('dataaa',data)
        if (value === null) return;

        // Generate the formatted key, handling nested keys appropriately
        let formattedKey = isEmpty(parentKey) ? key : `${parentKey}[${key}]`;

        if (value instanceof File) {
            // If the value is a File object, set it directly in formData
            formData.set(formattedKey, value);
        } else if (value instanceof Array) {
            // If the value is an Array, loop through the array elements
            forEach(value, (ele, index) => {
                if (ele instanceof File) {
                    // If the array element is a File object, append it
                    formData.append(`${formattedKey}`, ele);
                } else if (ele instanceof Object) {
                    // If the array element is an Object, check for nested arrays of files
                    Object.entries(ele).map(([nestedKey, nestedValue]) => {
                        if (nestedValue instanceof Array) {
                            forEach(nestedValue, (eachValue) => {
                                if (eachValue instanceof File) {
                                    formData.append(`${formattedKey}_${index}_${nestedKey}`, eachValue);
                                }
                            });
                        }
                    });
                    // Append the stringified object
                    formData.append(`${formattedKey}`, JSON.stringify(ele));
                } else {
                    // Append primitive values
                    formData.append(`${formattedKey}`, ele);
                }
            });
        } else if (value instanceof Object) {
            // If the value is an Object, recursively transform its properties
            transformToPatientEnrollmentDetailsFormData(value, formData, formattedKey);
        } else {
            // For primitive values, set them directly in formData
            formData.set(formattedKey, value);
        }
    });
    return formData;
}
