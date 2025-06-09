// import { useLocation } from 'react-router-dom';
// import { useMemo } from 'react';

// export function isDev() {
// 	if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
// 		return true;
// 	} else {
// 		return false;
// 	}
// }

// export function classNames(...classes) {
// 	return classes.filter(Boolean).join(' ');
// }

// export function useQuery() {
// 	const { search } = useLocation();

// 	return useMemo(() => new URLSearchParams(search), [search]);
// }

import imageCompression from 'browser-image-compression';
import { get } from 'lodash';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export const handleFileUpload = async (
	event,
	formik,
	formik_field,
	isMultiple
) => {
	const imageFile = event.target.files[0];

	const options = {
		maxSizeMB: 1,
		maxWidthOrHeight: 1920,
		useWebWorker: true,
	};
	try {
		const compressedFile = await imageCompression(imageFile, options);
		// formik.setFieldValue(formik_field, compressedFile);
		if (isMultiple) {
			formik.setFieldValue(formik_field, [
				...get(formik.values, formik_field, []),
				compressedFile,
			]);
		} else {
			formik.setFieldValue(formik_field, [compressedFile]);
		}
	} catch (error) {
		console.error(error);
	}
};

export function useQuery() {
	const { search } = useLocation();

	return useMemo(() => new URLSearchParams(search), [search]);
}

export const isObjectEmpty = (obj) => Object.keys(obj).length === 0;