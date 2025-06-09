import { Listbox, Transition } from '@headlessui/react';
import { useField } from 'formik';
import { Fragment, useEffect, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import { VariableSizeList as List } from 'react-window';
import { ReactComponent as SelectDropdownIcon } from '../../../src/assets/images/svg/select-dropdown-icon.svg';

export default function SelectField({
	label,
	formik,
	optionsData,
	optionsDataName,
	value,
	disabled = false,
	...props
}) {
	const [referenceElement, setReferenceElement] = useState(null);
	const [popperElement, setPopperElement] = useState(null);
	const { styles, attributes } = usePopper(referenceElement, popperElement);

	const [searchTerm, setSearchTerm] = useState('');

	let availableSkus = optionsData;

	const [selected, setSelected] = useState(
		optionsData?.find((eachData) => eachData.id === value) || {
			label: 'Select',
			id: '',
			unavailable: true,
		}
	);

	const [field, meta] = useField(props);

	const filteredOptions = searchTerm
		? availableSkus?.filter((item) =>
				item.label.toLowerCase().includes(searchTerm.toLowerCase())
		  )
		: availableSkus;

	const handleChange = (value) => {
		if (!disabled) { 
		setSelected(value);
		formik.setFieldValue(props.id, value.id);
		}
	};

	useEffect(() => {
		
		
		if (
			optionsData &&
			value &&
			optionsData.find((eachData) => eachData?.id === value)
		) {
			console.log(
				'value',
				optionsData,
				value,
				optionsData.find((eachData) => eachData?.id === value)
			);
			setSelected(optionsData.find((eachData) => eachData?.id === value));
		}

		if (!value) {
			setSelected({
				label: 'Select',
				id: '',
				unavailable: true,
			});
		}
	}, [value, optionsData]);

	const itemRef = useRef();

	function handleItemSize(index) {
		itemRef.current.innerHTML = optionsData[index]['label'];
		let size = itemRef.current.getBoundingClientRect().height;
		return size;
	}

	return (
		<div className="relative flex w-full flex-col gap-[4px]">
			<label className="font-open-sans text-form-xs font-semibold text-[#595454]">
				{label}
			</label>
			<div
				ref={itemRef}
				className="absolute block cursor-pointer p-2 font-lato opacity-0 "
			></div>
			<div className="">
				<Listbox disabled={disabled} value={selected} onChange={handleChange}>
					<div className="relative">
						<Listbox.Button
							className={`w-full rounded-md ${
								disabled ? 'cursor-not-allowed bg-[#f2f2f2]' : ''
							} border border-[#ACA9A9] px-[16px]  py-[14px]  font-open-sans placeholder:text-[#9A9A9A] hover:outline-0 focus:outline-0`}
							{...field}
							disabled={disabled}
							ref={(ref) => setReferenceElement(ref)}
						>
							<span
								className={`block w-[80%] truncate text-left ${
									selected.id
										? 'font-semibold text-[#283A46]'
										: 'text-[#9A9A9A] '
								}`}
							>
								{selected.label}
							</span>
							<span className="pointer-events-none absolute inset-y-0 right-[16px] flex items-center ">
								<SelectDropdownIcon aria-hidden="true" />
							</span>
						</Listbox.Button>
						<Transition
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
							// @ts-ignore
							ref={(ref) => setPopperElement(ref)}
							style={styles['popper']}
							{...attributes['popper']}
						>
							<Listbox.Options className="absolute z-[1] mt-1 h-fit max-h-96 w-full overflow-y-auto rounded-md border border-[#D2D1D1]  bg-white p-3 font-lato text-base   ring-opacity-5 focus:outline-none sm:text-sm">
								<div className="relative mb-4">
									<input
										type="text"
										name="search"
										id="search"
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className="px-2 block w-full  rounded-md  border  border-[#D2D1D1] bg-gray-50 py-2 pr-12 shadow-sm focus:outline-0 sm:text-sm"
										disabled={disabled}
									/>
									{searchTerm && (
										<div className="absolute inset-y-0 right-[4px] flex items-center py-2 px-2 font-semibold text-[#283A46]">
											{/* <CloseBtn
												className="h-[10px] w-[10px] cursor-pointer text-black"
												onClick={() => setSearchTerm('')}
											/> */}
										</div>
									)}
								</div>
								<List
									height={
										filteredOptions.length < 10
											? filteredOptions.length * 40
											: 300
									}
									width={'100%'}
									itemCount={filteredOptions.length}
									itemSize={handleItemSize}
									itemData={filteredOptions}
									className="complete-hidden-scroll-style"
								>
									{({ index, style }) => (
										<Listbox.Option
											key={index}
											style={style}
											className={({ active }) =>
												`relative cursor-default select-none p-2  text-[#171717]  ${
													active ? '' : ''
												}`
											}
											value={filteredOptions[index]}
											disabled={filteredOptions[index].unavailable || false}
										>
											{({ selected }) => (
												<>
													<span
														className={`block cursor-pointer rounded-md  py-2 font-lato text-portal-sm font-semibold text-[#283A46]  ${
															selected ? 'font-bold' : 'font-open-sans'
														} ${
															filteredOptions[index].unavailable || false
																? 'opacity-50'
																: 'cursor-pointer'
														}`}
													>
														{filteredOptions[index].label}
													</span>
													{selected ? (
														<span className="absolute inset-y-0 left-0  flex items-center"></span>
													) : null}
												</>
											)}
										</Listbox.Option>
									)}
								</List>
							</Listbox.Options>
						</Transition>
					</div>
				</Listbox>
			</div>
			{meta.touched && meta.error ? (
				<div className="font-lato text-form-xs text-[#cc3300]">
					{meta.error}
				</div>
			) : null}
		</div>
	);
}
