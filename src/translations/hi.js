// export const hindi = {
//     yes: "हाँ",
//     no: "नहीं",
//     save_next: "\u0938\u0939\u0947\u091c\u0947\u0902 \u0914\u0930 \u0905\u0917\u0932\u093e",
//     program_enrollment_title: "कार्यक्रम नामांकन",
//     profile_details_title: "प्रोफ़ाइल विवरण",
//     caregiver_title: "देखभाल करने वाले का विवरण",
//     document_upload_title: "दस्तावेज़ अपलोड करें",
//     personal_details_accordion_title:"व्यक्तिगत विवरण",
//     authorization_title: "प्राधिकरण सहमति",
//     id_proof_accordion_title: "पहचान प्रमाण",
//     address_proof_accordion_title: "निवास प्रमाण पत्र",
//     current_residence_accordion_title: "वर्तमान निवास",
//     reimbursement_accordion_title: "प्रतिपूर्ति जानकारी",
//     occupational_accordion_title: "व्यावसायिक विवरण",
//     caregiver_accordion_title: "देखभालकर्ता",
//     caregiver_address_title: "निवास प्रमाण पत्र",
//     caregiver_id_proof_title: "देखभाल करने वाले का पहचान प्रमाण",
//     id_proof_accordion_title: "पहचान प्रमाण",
//     other_documents_accordion_title: "अन्य दस्तावेज़",
//     personal_details_form:{
//         full_name: "पूरा नाम",
//         gender: "लिंग",
//         date_of_birth: "जन्म की तारीख",
//         mobile_number: "मोबाइल नंबर",
//         alternate_mobile_number: "वैध फोन नंबर",
//         email: "ईमेल",
//         nationality: "जनजाति",
//         buttons: {
//             next: "अगला"
//         },
//         gender_options: {
//             male: "पुरुष",
//             female: "महिला",
//             other: "अन्य"
//         }
//     },
//     address_proof_form: {
//         address_line_1: "पता पंक्ति 1",
//         address_line_2: "पता पंक्ति 2",
//         city: "शहर",
//         state: "राज्य",
//         pin_code: "पिन कोड",
//         placeholders: {
//             address_line_1: "पता पंक्ति 1 दर्ज करें",
//             address_line_2: "पता पंक्ति 2 दर्ज करें",
//             city: "शहर दर्ज करें",
//             state: "राज्य चुनें",
//             pin_code: "पिन कोड दर्ज करें"
//         },
//         validation: {
//             required: "आवश्यक",
//             pin_code: {
//                 min: "फ़ील्ड में कम से कम 6 अंक होने चाहिए",
//                 max: "फ़ील्ड में अधिकतम 6 अंक होने चाहिए"
//             }
//         },
//         buttons: {
//             next: "अगला"
//         }
//     },
//     current_residential_address_form: {
//         same_as_above_address: "उपरोक्त पता से समान",
//         address_line_1: "पता पंक्ति 1",
//         address_line_2: "पता पंक्ति 2",
//         city: "शहर",
//         state: "राज्य",
//         pin_code: "पिन कोड",
//         placeholders: {
//             address_line_1: "पता पंक्ति 1 दर्ज करें",
//             address_line_2: "पता पंक्ति 2 दर्ज करें",
//             city: "शहर दर्ज करें",
//             state: "राज्य चुनें",
//             pin_code: "पिन कोड दर्ज करें"
//         },
//         validation: {
//             required: "आवश्यक",
//             pin_code: {
//                 min: "फ़ील्ड में कम से कम 6 अंक होने चाहिए",
//                 max: "फ़ील्ड में अधिकतम 6 अंक होने चाहिए"
//             }
//         },
//         buttons: {
//             next: "अगला"
//         }
//     },
//     reimbursement_information_form: {
//         has_reimbursement_label: "क्या आपके पास रिमबर्समंट हैं?",
//         reimbursement_limits_label: "क्या आप प्रतिपूर्ति सीमाओं से अवगत हैं?",
//         reimbursement_type_label: "यदि हां तो कैसे रिमबर्समंट हैं?",
//         is_opdyta_label: "क्या OPDYTA प्रतिपूर्ति का हिस्सा है?",
//         opdyta_note: "यदि प्रतिपूर्ति के लिए कवर नहीं किया गया है तो नीति की प्रति के साथ शासी प्राधिकरण से एक पत्र या ईमेल की आवश्यकता होगी जिसमें अपवर्जन सूचीबद्ध हैं",
//         government: "सरकारी",
//         private: "निजी",
//         others: "अन्य",
//         validation: {
//             required: "आवश्यक"
//         },
//         buttons: {
//             next: "अगला"
//         }
//     },
//     occupation_details_form: {
//         employment_status_label: "आपकी रोजगार स्थिति क्या है?",
//         employment_types: {
//             self_employed: "स्वरोजगार",
//             salaried: "वेतनभोगी",
//             not_working: "काम नहीं कर रहे"
//         },
//         organization_details: {
//             current: "वर्तमान संगठन का नाम",
//             last: "पते के साथ वर्तमान संगठन का नाम"
//         },
//         employment_sector: {
//             semi_government: "क्या आप अर्ध-सरकारी संगठन के लिए काम कर रहे हैं?",
//             private: "क्या आप निजी संगठन में काम कर रहे हैं?",
//             service_government: "क्या आप सरकारी सेवा में कार्यरत हैं?"
//         },
//         validation: {
//             required: "आवश्यक",
//             select_option: "कृपया एक विकल्प चुनें",
//             organization_required: "कृपया वर्तमान संगठन का विवरण दर्ज करें"
//         },
//         buttons: {
//             next: "अगला"
//         }
//     },
//     caregiver_details_form: {
//         full_name: "पूरा नाम",
//         gender: "लिंग",
//         mobile_number: "मोबाइल नंबर",
//         email: "ईमेल आईडी",
//         placeholder: {
//             full_name: "दर्ज करें",
//             gender: "चुनें",
//             mobile_number: "000000000",
//             email: "john.doe@xyz.com"
//         },
//         validation: {
//             mobile_min: "फ़ील्ड में कम से कम 10 अंक होने चाहिए",
//             mobile_max: "फ़ील्ड में अधिकतम 10 अंक होने चाहिए",
//             email_invalid: "अमान्य ईमेल प्रारूप"
//         },
//         country_code: "+91",
//         next: "अगला"
//     },
//     caregiver_address_proof_form: {
//         address_line_1: "पता पंक्ति 1",
//         address_line_2: "पता पंक्ति 2",
//         city: "शहर",
//         state: "राज्य",
//         pin_code: "पिन कोड",
//         placeholders: {
//             address_line_1: "पता पंक्ति 1 दर्ज करें",
//             address_line_2: "पता पंक्ति 2 दर्ज करें",
//             city: "शहर दर्ज करें",
//             state: "राज्य चुनें",
//             pin_code: "पिन कोड दर्ज करें"
//         },
//         validation: {
//             pin_code: {
//                 min: "फ़ील्ड में कम से कम 6 अंक होने चाहिए",
//                 max: "फ़ील्ड में अधिकतम 6 अंक होने चाहिए"
//             }
//         },
//         buttons: {
//             next: "अगला"
//         }
//     },
//     caregiver_id_proof_form: {
//         title: "पहचान प्रमाण",
//         file_instructions: "फ़ाइल jpg/pdf/png प्रारूप में होनी चाहिए। दस्तावेज़ का अधिकतम आकार 5mb होना चाहिए।",
//         id_types: {
//             voter_id: "वोटर आईडी",
//             aadhar_card: "आधार कार्ड",
//             pan_card: "पैन कार्ड"
//         },
//         upload: {
//             label: "पहचान प्रमाण (सामने)",
//             placeholder: "पहचान प्रमाण अपलोड करें"
//         },
//         validation: {
//             required: "आवश्यक",
//             file_type: "अमान्य फ़ाइल प्रकार। केवल jpg, pdf और png फ़ाइलें स्वीकृत हैं",
//             file_size: "फ़ाइल का आकार 5MB से अधिक नहीं होना चाहिए"
//         }
//     },
//     id_proof_form: {
//         title: "पहचान प्रमाण",
//         file_instructions: "फ़ाइल jpg/pdf/png प्रारूप में होनी चाहिए। दस्तावेज़ का अधिकतम आकार 5mb होना चाहिए।",
//         id_types: {
//             voter_id: "वोटर आईडी",
//             aadhar_card: "आधार कार्ड",
//             pan_card: "पैन कार्ड"
//         },
//         upload: {
//             label: "पहचान प्रमाण (सामने)",
//             required: "*"
//         },
//         validation: {
//             required: "आवश्यक",
//             proof_type_required: "कृपया एक पहचान प्रमाण प्रकार चुनें",
//             file_required: "कृपया एक पहचान प्रमाण दस्तावेज़ अपलोड करें",
//             file_type: "अमान्य फ़ाइल प्रकार। केवल jpg, pdf और png फ़ाइलें स्वीकृत हैं",
//             file_size: "फ़ाइल का आकार 5MB से अधिक नहीं होना चाहिए"
//         },
//         buttons: {
//             next: "अगला"
//         }
//     },
//     other_documents_form: {
//         title: "अन्य दस्तावेज़",
//         file_instructions: "फ़ाइल jpg/pdf/png प्रारूप में होनी चाहिए। दस्तावेज़ का अधिकतम आकार 5mb होना चाहिए।",
//         prescription: {
//             label: "प्रिस्क्रिप्शन फ़ाइल",
//             required: "*"
//         },
//         diagnosis: {
//             label: "निदान विवरण",
//             required: "*"
//         },
//         validation: {
//             required: "आवश्यक",
//             file_required: "कृपया आवश्यक दस्तावेज़ अपलोड करें",
//             file_type: "अमान्य फ़ाइल प्रकार। केवल jpg, pdf और png फ़ाइलें स्वीकृत हैं",
//             file_size: "फ़ाइल का आकार 5MB से अधिक नहीं होना चाहिए"
//         }
//     },
//     authorization_form: {
//         title: "प्राधिकरण",
//         oasis_consent: {
//             label: "मैं OASIS केंद्र को अधिकृत करता/करती हूं",
//             points: {
//                 point1: "1. नामांकन प्रक्रिया को पूरा करने के लिए जानकारी की सटीकता को प्रमाणित करने के लिए स्वास्थ्य सेवा प्रदाताओं, इलाज करने वाले डॉक्टर और बीमा कंपनी से मेरी स्वास्थ्य जानकारी प्राप्त करने के लिए।",
//                 point2: "2. कार्यक्रम में मेरे नामांकन और भागीदारी के दौरान BMS की ओर से आवश्यक ऑडिट और रोगी सत्यापन प्रक्रियाओं (तीसरे पक्षों के माध्यम से सहित) को संचालित करने के लिए। ऐसा करने में विफलता रोगी सहायता कार्यक्रम में प्रवेश/जारी रखने की क्षमता को प्रभावित कर सकती है।",
//                 point3: "3. अतिरिक्त जानकारी के लिए या कार्यक्रम की सेवाएं प्रदान करने के लिए मुझसे या मेरे देखभालकर्ता से कॉल या ईमेल या संचार के अन्य रूप से संपर्क करने के लिए।",
//                 point4: "4. मैं OASIS को हमारी बातचीत के दौरान पहचाने जाने वाले किसी भी प्रतिकूल घटना की रिपोर्ट BMS को करने की अनुमति देता/देती हूं और यह भी सहमत हूं कि यदि आवश्यक हो तो BMS अधिक विवरण प्राप्त करने के लिए मेरे इलाज करने वाले चिकित्सक से संपर्क कर सकता है।"
//             }
//         },
//         program_consent: {
//             label: "मैं पुष्टि करता/करती हूं कि BMS रोगी सहायता कार्यक्रम मुझे पूरी तरह से समझाया गया है और मैं ऊपर बताए अनुसार कार्यक्रम में शामिल होने की सहमति देता/देती हूं।",
//             options: {
//                 yes: "हां",
//                 no: "नहीं"
//             }
//         },
//         data_consent: {
//             label: "मैं ऊपर बताए अनुसार BMS रोगी सहायता कार्यक्रम प्रदान करने के उद्देश्यों के लिए OASIS केंद्र को मेरी व्यक्तिगत जानकारी के प्रसंस्करण की सहमति देता/देती हूं।",
//             options: {
//                 yes: "हां",
//                 no: "नहीं"
//             }
//         },
//         validation: {
//             consent_required: "कृपया सहमति दें",
//             yes_required: "कृपया आगे बढ़ने के लिए 'हां' का चयन करें।",
//             required: "आवश्यक"
//         }
//     },
//     consent_form: {
//         title: 'कृपया नियम और शर्तों से सहमत हों',
//         validation: {
//             consent_required: 'सहमति प्रस्तुत करना आवश्यक है'
//         },
//         terms: {
//             program_eligibility: 'यह कार्यक्रम केवल निवोलुमैब (OPDYTA®) के लिए है और सभी रोगियों (OASIS पात्रता मानदंडों के अनुसार) के लिए खुला है जिन्हें पंजीकृत ऑन्कोलॉजिस्ट के नुस्खे पर DCGI द्वारा अनुमोदित मोनोथेरेपी या निवोलुमैब (OPDYTA®) आधारित संयोजन के रूप में निवोलुमैब (OPDYTA®) निर्धारित किया गया है।',
//             nationality: 'नामांकन केवल भारत में स्थित भारतीय नागरिकों के लिए खुला है।',
//             non_transferable: 'नामांकन की पुष्टि हस्तांतरणीय नहीं है।',
//             enrollment_discretion: 'नामांकन आवेदन की स्वीकृति OASIS केंद्र के प्रबंधन के विवेक पर है।',
//             services: 'सदस्य OASIS केंद्र द्वारा प्रदान की जाने वाली सेवाओं को प्राप्त करने के हकदार हैं जैसा कि समय-समय पर प्रबंधन द्वारा निर्धारित किया जाता है।',
//             voluntary_participation: 'कार्यक्रम में भागीदारी स्वैच्छिक और वैकल्पिक है। सदस्य OASIS केंद्र को लिखित नोटिस देकर किसी भी समय इस कार्यक्रम में भागीदारी समाप्त कर सकते हैं।',
//             liability: 'OASIS का प्रबंधन और इसका प्रायोजक, BMS इस कार्यक्रम के तहत प्रदान की गई किसी भी सेवा के उपयोग या अन्य निर्भरता से उत्पन्न होने वाले किसी भी नुकसान/क्षति के दावे के लिए जिम्मेदार नहीं होगा।',
//             rights_reserved: 'OASIS केंद्र / BMS कार्यक्रम के किसी भी घटक, सामग्री, नियमों या शर्तों को वापस लेने और/या बदलने और/या किसी भी नामांकन को समाप्त करने का पूर्ण अधिकार सुरक्षित रखता है।',
//             patient_rights: 'रोगी को अस्वीकार करने का अधिकार, कार्यक्रम से हटने का अधिकार और न्यायपालिका और सरकारी एजेंसी के साथ प्रासंगिक जानकारी साझा करने का अधिकार है।',
//             reimbursement: 'यह कार्यक्रम पूर्ण प्रतिपूर्ति वाले रोगी के लिए लागू नहीं है।',
//             misrepresentation: 'नामांकन के दौरान या कार्यक्रम के किसी भी चरण में जानकारी का गलत प्रतिनिधित्व या धोखाधड़ी वाले दस्तावेजों की प्रस्तुति के लिए कार्यक्रम को तुरंत बंद कर दिया जाएगा। OASIS केंद्र और BMS कार्यक्रम के दुरुपयोग के कारण हुए नुकसान के लिए दावा करने का अधिकार सुरक्षित रखते हैं।',
//             free_doses: 'मुफ्त खुराक भुगतान की गई खुराक के प्रशासन की शर्त के अधीन है। यदि भुगतान की गई खुराक आंशिक रूप से दी जाती है, तो कंपनी केवल भुगतान की गई खुराक के बराबर मुफ्त खुराक देने के लिए उत्तरदायी होगी। पहली खुराक के बाद मृत्यु या उपचार बंद होने की स्थिति में, BMS मुफ्त दवा नहीं देगा।'
//         },
//         buttons: {
//             agree: 'मैं नियम और शर्तों से सहमत हूं'
//         }
//     },
//     doc_esign: {
//         title: "नामांकन प्राधिकरण",
//         aadhar_esign: {
//             title: "आधार आधारित ई-साइनिंग क्या है?",
//             description: "आधार-आधारित ई-साइनिंग भारत में इलेक्ट्रॉनिक हस्ताक्षर का एक रूप है जो दस्तावेजों पर डिजिटल हस्ताक्षर करने के लिए किसी व्यक्ति के आधार (12-अंकीय विशिष्ट पहचान संख्या) और आधार प्रणाली के माध्यम से प्रमाणीकरण का उपयोग करता है।"
//         },
//         steps: {
//             title: "चरण:",
//             list: {
//                 step1: "नीचे दिए गए बटन \"मेरा नामांकन फॉर्म साइन करें\" पर क्लिक करें",
//                 step2: "दस्तावेज़ के बाएं ऊपरी कोने में पीले रंग में दिखाए गए स्टार्ट बटन पर क्लिक करें",
//                 step3: "ई-साइन सेक्शन पर क्लिक करें",
//                 step4: "ओटीपी चरणों का पालन करें और सबमिट करें"
//             }
//         },
//         note: {
//             prefix: "नोट:",
//             text: "नामांकन फॉर्म हस्ताक्षर के लिए आगे बढ़ने के लिए लोकेशन की अनुमति आवश्यक है"
//         },
//         button: "मेरा नामांकन फॉर्म साइन करें",
//         compatibility_error: "डिवाइस संगतता त्रुटि। उफ़! ऐसा लगता है कि आप इस सेवा को गैर-नेटिव डिवाइस से एक्सेस करने का प्रयास कर रहे हैं। सर्वोत्तम प्रदर्शन और सर्वोत्तम उपयोगकर्ता अनुभव सुनिश्चित करने के लिए, कृपया हमारी सेवा का उपयोग समर्थित नेटिव डिवाइस पर करें। यदि आपके कोई प्रश्न हैं या आपको और सहायता की आवश्यकता है, तो हमारी सहायता टीम आपकी मदद के लिए यहां है। आपकी समझ के लिए धन्यवाद!"
//     },
//     profile: {
//         title: "प्रोफ़ाइल",
//         sections: {
//             my_profile: "मेरी प्रोफ़ाइल",
//             order_history: "ऑर्डर इतिहास"
//         },
        
//         order_history: {
//             title: "ऑर्डर इतिहास",
//             active_order: {
//                 title: "सक्रिय ऑर्डर",
//                 order_id: "ऑर्डर आईडी",
//                 status: {
//                     dispatch: "डिस्पैच"
//                 }
//             },
//             past_orders: {
//                 title: "पिछले ऑर्डर",
//                 filters: {
//                     all: "सभी",
//                     paid: "भुगतान किए गए ऑर्डर",
//                     free: "मुफ्त ऑर्डर"
//                 }
//             },
//             fields: {
//                 order_date: "ऑर्डर की तारीख",
//                 dispensed_date: "वितरित तिथि",
//                 dosage: "खुराक",
//                 distributor: "वितरक",
//                 pharmacy: "फार्मेसी",
//                 infusion_date: "इन्फ्यूजन की तारीख"
//             },
//             card: {
//                 more: "और...",
//                 less: "कम...",
//                 order_advice: "ऑर्डर सलाह दस्तावेज़"
//             },
//             not_available: "उपलब्ध नहीं"
//         }
//     },
//     my_profile: {
//         title: "मेरी प्रोफ़ाइल",
//         toast: {
//             success: "भुगतान किए गए ऑर्डर के लिए सफलतापूर्वक अनुरोध किया गया।"
//         },
//         sections: {
//             personal_details: {
//                 title: "व्यक्तिगत विवरण",
//                 fields: {
//                     name: "नाम",
//                     gender: "लिंग",
//                     dob: "जन्म तिथि",
//                     mobile: "मोबाइल नंबर",
//                     email: "ईमेल आईडी",
//                     age: "उम्र",
//                     address: "पता",
//                     city: "शहर",
//                     state: "राज्य",
//                     pin_code: "पिन कोड",
//                     relation: "रिश्ता",
//                     contact_number: "संपर्क नंबर"
//                 }
//             },
//             address: {
//                 title: "पता",
//                 fields: {
//                     address_line_1: "पता पंक्ति 1",
//                     address_line_2: "पता पंक्ति 2",
//                     city: "शहर",
//                     state: "राज्य",
//                     pin_code: "पिन कोड"
//                 }
//             },
//             caregiver: {
//                 title: "देखभालकर्ता",
//                 fields: {
//                     name: "नाम",
//                     gender: "लिंग",
//                     dob: "जन्म तिथि",
//                     mobile: "मोबाइल नंबर",
//                     email: "ईमेल आईडी",
//                     relation: "रिश्ता",
//                     address_line_1: "पता पंक्ति 1",
//                     address_line_2: "पता पंक्ति 2",
//                     city: "शहर",
//                     state: "राज्य",
//                     pin_code: "पिन कोड"
//                 }
//             },
//             reimbursement: {
//                 title: "प्रतिपूर्ति जानकारी",
//                 fields: {
//                     type: "प्रतिपूर्ति प्रकार",
//                     limits: "प्रतिपूर्ति सीमाएं",
//                     amount: "प्रतिपूर्ति राशि",
//                     status: "स्थिति"
//                 }
//             },
//             prescription: {
//                 title: "प्रिस्क्रिप्शन विवरण",
//                 fields: {
//                     doctor_name: "डॉक्टर का नाम",
//                     hospital_name: "अस्पताल का नाम",
//                     prescription_date: "प्रिस्क्रिप्शन की तारीख"
//                 }
//             }
//         },
//         not_available: "उपलब्ध नहीं",
//         buttons: {
//             edit: "संपादित करें",
//             save: "सहेजें",
//             cancel: "रद्द करें"
//         },
//         validation: {
//             required: "यह फ़ील्ड आवश्यक है",
//             invalid_email: "अमान्य ईमेल पता",
//             invalid_phone: "अमान्य फ़ोन नंबर"
//         }
//     },
//     profile_modal: {
//         logout: "लॉग आउट",
//         compatibility_error: "डिवाइस संगतता त्रुटि। उफ़! ऐसा लगता है कि आप इस सेवा को गैर-नेटिव डिवाइस से एक्सेस करने का प्रयास कर रहे हैं। सर्वोत्तम प्रदर्शन और सर्वोत्तम उपयोगकर्ता अनुभव सुनिश्चित करने के लिए, कृपया हमारी सेवा का उपयोग समर्थित नेटिव डिवाइस पर करें। यदि आपके कोई प्रश्न हैं या आपको और सहायता की आवश्यकता है, तो हमारी सहायता टीम मदद के लिए यहां है। आपकी समझ के लिए धन्यवाद!"
//     },
//     home: {
//         program_details: {
//             title: "कार्यक्रम विवरण",
//             program_name: {
//                 active_badge: "सक्रिय"
//             },
//             fields: {
//                 patient_id: "रोगी आईडी",
//                 enrolled_date: "नामांकन तिथि",
//                 remaining_infusions: "शेष इन्फ्यूजन",
//                 doctor_name: "डॉक्टर का नाम"
//             }
//         },
//         recent_order: {
//             title: "हाल का ऑर्डर",
//             order_id_prefix: "ऑर्डर आईडी",
//             status: {
//                 paid: "भुगतान किया",
//                 free: "निःशुल्क"
//             },
//             actions: {
//                 resend_otp: "ओटीपी पुनः भेजें",
//                 confirm_infusion: "इन्फ्यूजन की पुष्टि करें"
//             },
//             fields: {
//                 order_date: "ऑर्डर की तिथि",
//                 distributor: "वितरक",
//                 pharmacy: "फार्मेसी"
//             }
//         },
//         oasis_section: {
//             title: "और जानें",
//             program_name: "OPDYTA® OASIS रोगी सहायता कार्यक्रम (PAP)",
//             view_all: "सभी देखें",
//             tags: {
//                 pv_reporting: "पीवी रिपोर्टिंग"
//             }
//         },
//         order_success: "ऑर्डर अनुरोध सफलतापूर्वक जनरेट किया गया",
//         buttons: {
//             confirm_infusion: "इन्फ्यूजन की पुष्टि करें",
//             request_order: "ऑर्डर का अनुरोध करें"
//         }
//     },
//     ekyc_pending: {
//         notification: {
//             message: "आपने ",
//             highlight: "अपना भुगतान किया हुआ इन्फ्यूजन पूरा कर लिया है, कृपया अपना रिमोट सत्यापन पूरा करें",
//             continuation: " अगला ऑर्डर प्रोसेस करने के लिए।"
//         },
//         verification: {
//             title: "अपना सत्यापन पूरा करें"
//         },
//         button: {
//             start: "eKYC शुरू करें"
//         },
//         mobile_status: {
//             linked: "आधार कार्ड से लिंक किया गया मोबाइल नंबर",
//             not_linked: "आधार कार्ड से लिंक नहीं किया गया मोबाइल नंबर"
//         },
//         error: {
//             device_compatibility: "डिवाइस कंपैटिबिलिटी एरर। उफ़! ऐसा लगता है कि आप इस सेवा को गैर-नेटिव डिवाइस से एक्सेस करने की कोशिश कर रहे हैं। सर्वोत्तम प्रदर्शन और सर्वोत्तम उपयोगकर्ता अनुभव सुनिश्चित करने के लिए, कृपया हमारी सेवा का उपयोग समर्थित नेटिव डिवाइस पर करें। यदि आपके कोई प्रश्न हैं या आपको और सहायता की आवश्यकता है, तो हमारी सहायता टीम मदद के लिए यहां है। आपकी समझ के लिए धन्यवाद!"
//         }
//     },
//     physical_kyc: {
//         notification: {
//             message: "आपने ",
//             highlight: "अपना पहला इन्फ्यूजन पूरा कर लिया है, कृपया अपना भौतिक सत्यापन पूरा करें",
//             continuation: " अगला ऑर्डर प्रोसेस करने के लिए।"
//         },
//         verification: {
//             title: "सत्यापन लंबित",
//             status: "पीएपी टीम जल्द ही सत्यापन के लिए संपर्क करेगी"
//         },
//         process: {
//             title: "वर्चुअल सत्यापन प्रक्रिया"
//         }
//     },
//     program_enrollment_success: {
//         notification: {
//             message: "आपने सफलतापूर्वक अपने प्रोग्राम का विवरण जमा कर दिया है। ",
//             highlight1: "आपके दस्तावेज़ मूल्यांकन के अधीन हैं",
//             highlight2: "पीएपी टीम",
//             continuation: "। स्वीकृत होने पर आपको अगले कदम के बारे में सूचित किया जाएगा!"
//         },
//         status: {
//             title: "अब आराम करें!",
//             subtitle: "जब तक हम आपके जमा किए गए दस्तावेजों की जांच करते हैं"
//         },
//         about: {
//             title: "के बारे में ",
//             program_name: "OPDYTA® OASIS रोगी सहायता कार्यक्रम (PAP)",
//             description: "बीएमएस रोगियों की मदद करने के लिए प्रतिबद्ध है। बीएमएस विश्व स्तर पर स्वास्थ्य असमानताओं को कम करने और दवा तक वैश्विक पहुंच बढ़ाने के लिए कई कार्यक्रम संचालित करता है। बीएमएस इंडिया ने OPDYTA® PAP की शुरुआत उन रोगियों के लिए की है जिन्हें भारत में किसी पंजीकृत ऑन्कोलॉजिस्ट द्वारा स्वीकृत संकेत में OPDYTA® (निवोलुमैब) निर्धारित किया गया है, यदि पात्रता मानदंड पूरा किया जाता है।"
//         }
//     },
//     request_callback: {
//         modal: {
//             title: "कॉल बैक का अनुरोध करें"
//         },
//         form: {
//             date: {
//                 label: "दिनांक",
//                 placeholder: "दिन/महीना/वर्ष",
//                 error: "दिनांक आवश्यक है"
//             },
//             time_slot: {
//                 label: "समय स्लॉट",
//                 placeholder: "समय स्लॉट चुनें",
//                 error: "समय स्लॉट आवश्यक है",
//                 // options: {
//                 //     "9_10": "सुबह 9 बजे - सुबह 10 बजे",
//                 //     "10_11": "सुबह 10 बजे - सुबह 11 बजे",
//                 //     "11_12": "सुबह 11 बजे - दोपहर 12 बजे",
//                 //     "12_1": "दोपहर 12 बजे - दोपहर 1 बजे",
//                 //     "3_4": "दोपहर 3 बजे - शाम 4 बजे",
//                 //     "4_5": "शाम 4 बजे - शाम 5 बजे",
//                 //     "5_6": "शाम 5 बजे - शाम 6 बजे"
//                 // }
//             },
//             note: {
//                 label: "नोट",
//                 placeholder: "यहां कोई अतिरिक्त नोट दर्ज करें",
//                 error: "नोट आवश्यक है"
//             },
//             submit: "जमा करें"
//         },
//         notifications: {
//             success: "कॉल बैक का अनुरोध किया गया। पीएपी टीम अगले चरणों के लिए आपसे संपर्क करेगी"
//         }
//     },
//     request_order: {
//         modal: {
//             title: "ऑर्डर अनुरोध"
//         },
//         form: {
//             description: "ऑर्डर अनुरोध को प्रोसेस करने में सहायता के लिए ओएसिस सपोर्ट अगले 2 घंटों में आपको कॉल करेगा",
//             submit: "जमा करें",
//             prescription_change: {
//                 text: "प्रिस्क्रिप्शन में बदलाव?",
//                 action: "कॉल बैक का अनुरोध करें"
//             }
//         },
//         notifications: {
//             success: "ऑर्डर अनुरोध सफलतापूर्वक जमा किया गया",
//             error: "ऑर्डर अनुरोध जमा करने में विफल"
//         }
//     },
//     enroll_success: {
//         title: "खाता सफलतापूर्वक बनाया गया",
//         subtitle: "अब, कार्यक्रम में नामांकन करने के लिए अपनी प्रोफ़ाइल पूरी करें",
//         description: "विवरण भरें और स्वीकृति के लिए भेजें।",
//         program: {
//             title: "आपने जिसके लिए नामांकन किया है",
//             names: {
//                 shambhav: "शम्भव",
//                 aarambh: "आरंभ"
//             }
//         },
//         buttons: {
//             get_started: "शुरू करें"
//         }
//     }
// }

export const hindi = {
	yes: 'हाँ',
	no: 'नहीं',
	save_next: 'सहेजें और अगला',
	program_enrollment_title: 'कार्यक्रम नामांकन',
	profile_details_title: 'प्रोफ़ाइल विवरण',
	caregiver_title: 'देखभाल करने वाले का विवरण',
	document_upload_title: 'दस्तावेज़ अपलोड करें',
	authorization_title: 'प्राधिकरण सहमति',
	personal_details_accordion_title: 'व्यक्तिगत विवरण',
	address_proof_accordion_title: 'निवास प्रमाण पत्र',
	current_residence_accordion_title: 'वर्तमान निवास',
	reimbursement_accordion_title: 'प्रतिपूर्ति जानकारी',
	occupational_accordion_title: 'व्यावसायिक विवरण',
	caregiver_accordion_title: 'देखभालकर्ता',
	caregiver_address_title: 'निवास प्रमाण पत्र',
	caregiver_id_proof_title: 'देखभाल करने वाले का पहचान प्रमाण',
	id_proof_accordion_title: 'पहचान प्रमाण',
	other_documents_accordion_title: 'अन्य दस्तावेज',
	'personal_details_form.full_name': 'पूरा नाम',
	'personal_details_form.gender': 'लिंग',
	'personal_details_form.date_of_birth': 'जन्म तिथि',
	'personal_details_form.mobile_number': 'मोबाइल नंबर',
	'personal_details_form.alternate_mobile_number': 'वैध फ़ोन नंबर',
	'personal_details_form.email': 'ईमेल',
	'personal_details_form.nationality': 'राष्ट्रीयता',
	'personal_details_form.buttons.next': 'अगला',
	'personal_details_form.gender_options.male': 'पुरुष',
	'personal_details_form.gender_options.female': 'महिला',
	'personal_details_form.gender_options.other': 'अन्य',
	'address_proof_form.address_line_1': 'पता पंक्ति 1',
	'address_proof_form.address_line_2': 'पता पंक्ति 2',
	'address_proof_form.city': 'शहर',
	'address_proof_form.state': 'राज्य',
	'address_proof_form.pin_code': 'पिन कोड',
	'address_proof_form.placeholders.address_line_1': 'पता पंक्ति 1 दर्ज करें',
	'address_proof_form.placeholders.address_line_2': 'पता पंक्ति 2 दर्ज करें',
	'address_proof_form.placeholders.city': 'शहर का नाम दर्ज करें',
	'address_proof_form.placeholders.state': 'राज्य चुनें',
	'address_proof_form.placeholders.pin_code': 'पिन कोड दर्ज करें',
	'address_proof_form.validation.required': 'आवश्यक',
	'address_proof_form.validation.pin_code.min':
		'फ़ील्ड में कम से कम 6 अंक होने चाहिए',
	'address_proof_form.validation.pin_code.max':
		'फ़ील्ड में कम से कम 6 अंक होने चाहिए',
	'address_proof_form.buttons.next': 'अगला',
	'current_residential_address_form.same_as_above_address':
		'उपरोक्त पते के समान',
	'current_residential_address_form.address_line_1': 'पता पंक्ति 1',
	'current_residential_address_form.address_line_2': 'पता पंक्ति 2',
	'current_residential_address_form.city': 'शहर',
	'current_residential_address_form.state': 'राज्य',
	'current_residential_address_form.pin_code': 'पिन कोड',
	'current_residential_address_form.placeholders.address_line_1':
		'पता पंक्ति 1',
	'current_residential_address_form.placeholders.address_line_2':
		'पता पंक्ति 2',
	'current_residential_address_form.placeholders.city': 'शहर का नाम दर्ज करें',
	'current_residential_address_form.placeholders.state': 'राज्य चुनें',
	'current_residential_address_form.placeholders.pin_code': 'पिन कोड दर्ज करें',
	'current_residential_address_form.validation.required': 'आवश्यक',
	'current_residential_address_form.validation.pin_code.min':
		'फ़ील्ड में कम से कम 6 अंक होने चाहिए',
	'current_residential_address_form.validation.pin_code.max':
		'फ़ील्ड में कम से कम 6 अंक होने चाहिए',
	'current_residential_address_form.buttons.next': 'अगला',
	'reimbursement_information_form.has_reimbursement_label':
		'क्या आपके पास प्रतिपूर्ति है?',
	'reimbursement_information_form.reimbursement_limits_label':
		'क्या आप प्रतिपूर्ति सीमा के बारे में जानते हैं',
	'reimbursement_information_form.reimbursement_type_label':
		'यदि हां, तो कृपया बताएं:',
	'reimbursement_information_form.is_opdyta_label':
		'क्या OPDYTA को प्रतिपूर्ति के भाग के रूप में कवर किया गया है:',
	'reimbursement_information_form.is_rojuzda_label':
		'क्या ROJUZDA को प्रतिपूर्ति के भाग के रूप में कवर किया गया है:',
	'reimbursement_information_form.opdyta_note':
		'यदि प्रतिपूर्ति के लिए कवर नहीं किया गया है तो नीति प्रति के साथ शासी प्राधिकारी से एक पत्र या एक ईमेल की आवश्यकता होगी जिसमें बहिष्करण सूचीबद्ध हैं',
	'reimbursement_information_form.government': 'सरकार',
	'reimbursement_information_form.private': 'निजी',
	'reimbursement_information_form.others': 'अन्य',
	'reimbursement_information_form.oasis_help':
		'कृपया ओएसिस हेल्प सेंटर से संपर्क करें',
	'reimbursement_information_form.validation.required': 'आवश्यक',
	'reimbursement_information_form.buttons.next': 'अगला',
	'occupation_details_form.employment_status_label':
		'आपके रोजगार की स्थिति क्या है?',
	'occupation_details_form.employment_types.self_employed': 'स्व-रोज़गार',
	'occupation_details_form.employment_types.salaried': 'नौकरीपेशा',
	'occupation_details_form.employment_types.not_working': 'बेरोज़गार नहीं है',
	'occupation_details_form.organization_details.current': 'मौजूदा संगठन का नाम',
	'occupation_details_form.organization_details.last':
		'पते सहित वर्तमान संगठन का नाम',
	'occupation_details_form.employment_sector.semi_government':
		'क्या आप किसी अर्ध-सरकारी संगठन के लिए काम कर रहे हैं?',
	'occupation_details_form.employment_sector.private':
		'क्या आप किसी प्राइवेट संस्था में काम कर रहे हैं',
	'occupation_details_form.employment_sector.service_government':
		'क्या आप सरकारी सेवा में कार्यरत हैं?',
	'occupation_details_form.validation.required': 'आवश्यक',
	'occupation_details_form.validation.select_option': 'कृपया एक विकल्प चुनें',
	'occupation_details_form.validation.organization_required':
		'कृपया वर्तमान संगठन विवरण दर्ज करें',
	'occupation_details_form.buttons.next': 'अगला',
	'caregiver_details_form.full_name': 'पूरा नाम',
	'caregiver_details_form.gender': 'लिंग',
	'caregiver_details_form.mobile_number': 'मोबाइल नंबर',
	'caregiver_details_form.email': 'ईमेल आईडी',
	'caregiver_details_form.placeholder.full_name': 'कृपया विवरण दर्ज करें',
	'caregiver_details_form.placeholder.gender': 'चुनना / चयन करें',
	'caregiver_details_form.placeholder.mobile_number': '000000000',
	'caregiver_details_form.placeholder.email': 'john.doe@xyz.com',
	'caregiver_details_form.validation.mobile_min':
		'फ़ील्ड में कम से कम 10 अंक होने चाहिए',
	'caregiver_details_form.validation.mobile_max':
		'फ़ील्ड में अधिकतम 10 अंक होने चाहिए',
	'caregiver_details_form.validation.email_invalid': 'अमान्य ईमेल स्वरूप',
	'caregiver_details_form.country_code': '+91',
	'caregiver_details_form.next': 'अगला',
	'caregiver_address_proof_form.address_line_1': 'पता पंक्ति 1',
	'caregiver_address_proof_form.address_line_2': 'पता पंक्ति 1',
	'caregiver_address_proof_form.city': 'शहर',
	'caregiver_address_proof_form.state': 'राज्य',
	'caregiver_address_proof_form.pin_code': 'पिन कोड',
	'caregiver_address_proof_form.placeholders.address_line_1':
		'पता पंक्ति 1 दर्ज करें',
	'caregiver_address_proof_form.placeholders.address_line_2':
		'पता पंक्ति 2 दर्ज करें',
	'caregiver_address_proof_form.placeholders.city': 'शहर का नाम दर्ज करें',
	'caregiver_address_proof_form.placeholders.state': 'राज्य चुनें',
	'caregiver_address_proof_form.placeholders.pin_code': 'पिन कोड दर्ज करें',
	'caregiver_address_proof_form.validation.pin_code.min':
		'फ़ील्ड में कम से कम 6 अंक होने चाहिए',
	'caregiver_address_proof_form.validation.pin_code.max':
		'फ़ील्ड में कम से कम 6 अंक होने चाहिए',
	'caregiver_address_proof_form.buttons.next': 'अगला',
	'caregiver_id_proof_form.title': 'पहचान प्रमाण',
	'caregiver_id_proof_form.file_instructions':
		'फ़ाइल jpg/pdf/png फ़ॉर्मेट में होनी चाहिए। दस्तावेज़ का अधिकतम आकार 5mb होना चाहिए।',
	'caregiver_id_proof_form.id_types.voter_id': 'वोटर आईडी',
	'caregiver_id_proof_form.id_types.aadhar_card': 'आधार कार्ड',
	'caregiver_id_proof_form.id_types.pan_card': 'पैन कार्ड',
	'caregiver_id_proof_form.upload.label': 'आईडी प्रमाण (सामने की ओर)',
	'caregiver_id_proof_form.upload.placeholder': 'आईडी प्रमाण अपलोड करें',
	'caregiver_id_proof_form.validation.required': 'आवश्यक',
	'caregiver_id_proof_form.validation.file_type':
		'फ़ाइल jpg/pdf/png फ़ॉर्मेट में होनी चाहिए। दस्तावेज़ का अधिकतम आकार 5mb होना चाहिए।',
	'caregiver_id_proof_form.validation.file_size':
		'फ़ाइल का आकार 5MB से अधिक नहीं होना चाहिए',
	'id_proof_form.title': 'पहचान प्रमाण',
	'id_proof_form.file_instructions':
		'फ़ाइल jpg/pdf/png फ़ॉर्मेट में होनी चाहिए। दस्तावेज़ का अधिकतम आकार 5mb होना चाहिए।',
	'id_proof_form.id_types.voter_id': 'वोटर आईडी',
	'id_proof_form.id_types.aadhar_card': 'आधार कार्ड',
	'id_proof_form.id_types.pan_card': 'पैन कार्ड',
	'id_proof_form.upload.label': 'आईडी प्रमाण (सामने की ओर)',
	'id_proof_form.validation.required': 'आवश्यक',
	'id_proof_form.validation.proof_type_required':
		'कृपया एक आईडी प्रमाण प्रकार चुनें',
	'id_proof_form.validation.file_required':
		'कृपया एक आईडी प्रूफ दस्तावेज़ अपलोड करें',
	'id_proof_form.validation.file_type':
		'फ़ाइल jpg/pdf/png फ़ॉर्मेट में होनी चाहिए। दस्तावेज़ का अधिकतम आकार 5mb होना चाहिए।',
	'id_proof_form.validation.file_size':
		'फ़ाइल का आकार 5MB से अधिक नहीं होना चाहिए',
	'id_proof_form.buttons.next': 'अगला',
	'other_documents_form.title': 'अन्य दस्तावेज',
	'other_documents_form.file_instructions':
		'फ़ाइल jpg/pdf/png फ़ॉर्मेट में होनी चाहिए। दस्तावेज़ का अधिकतम आकार 5mb होना चाहिए।',
	'other_documents_form.prescription.label': 'प्रिस्क्रिप्शन फ़ाइल',
	'other_documents_form.diagnosis.label': 'निदान विवरण',
	'other_documents_form.validation.required': 'आवश्यक',
	'other_documents_form.validation.file_required':
		'कृपया आवश्यक दस्तावेज़ अपलोड करें',
	'other_documents_form.validation.file_type':
		'फ़ाइल jpg/pdf/png फ़ॉर्मेट में होनी चाहिए। दस्तावेज़ का अधिकतम आकार 5mb होना चाहिए।',
	'other_documents_form.validation.file_size':
		'फ़ाइल का आकार 5MB से अधिक नहीं होना चाहिए',
	'authorization_form.title': 'प्राधिकरण:',
	'authorization_form.oasis_consent.label':
		'मैं ओएसआईएस केंद्र को प्राधिकृत करता/करती हूँ:',
	'authorization_form.oasis_consent.points.point1':
		'नामांकन प्रक्रिया को पूरा करने के लिए जानकारी की सटीकता को प्रमाणित करने के लिए स्वास्थ्य देखरेख प्रदाताओं, उपचार करने वाले डॉक्टर और बीमा कंपनी से मेरी स्वास्थ्य जानकारी प्राप्त करना',
	'authorization_form.oasis_consent.points.point2':
		'कार्यक्रम के लिए और कार्यक्रम में पूर्वानमान लगाने संबंधी मेरे नामांकन के दौरान बीएमएस की ओर से आवश्यक ऑडिट और रोगी की ऑडियो/वीडियो/शारीरिक सत्यापन की प्रक्रियाओं (इसमें ततीय पक्षों के माध्यम से शामित्र हैं) का संचालन करना. ऐसा करने में विफल रहने से रोगी सहायता कार्यक्रम में प्रवेश करने/जारी रखने की क्षमता प्रभावित हो सकती है.',
	'authorization_form.oasis_consent.points.point3':
		'अतिरिक्त जानकारी के लिए या कार्यक्रम की सेवाएं देने के लिए या तो कॉल या ईमेल द्वारा या संचार के अन्य तरीके से मझसे या मेरे देखभालकर्ता से संपर्क करना.',
	'authorization_form.oasis_consent.points.point4':
		'मैं ओएसिस को ऐसी किसी भी प्रतिकूल घटना की रिपोर्ट करने की अनुमति देता/देती हूं, जिसे बीएमएस के साथ हमारी बातचीत के दौरान पहचाना जा सकता है और मैं इससे भी सहमत हूँ कि यदि आवश्यक हुआ तो बीएमएस अधिक जानकारी प्राप्त करने के लिए मेरे उपचार करने वाले फिज़िशियन से संपर्क कर सकता है.',
	'authorization_form.program_consent.label':
		'मैं पष्टि करता/करती के बीएमएस रोगी सहायता कार्यक्रम मुझे पूरी तरह से समझाया गया है और मैं ऊपर बताए अनुसार कार्यक्रम में शामिल होने के लिए सहमत हूं',
	'authorization_form.program_consent.options.yes': 'हाँ',
	'authorization_form.program_consent.options.no': 'नहीं',
	'authorization_form.data_consent.label':
		'मैं ऊपर बताए अनसार बीएमएस रोगी सहायता कार्यक्रम प्रदान करने के उद्देश्यों से ओएसिस केंद्र दवारा मेरी व्यक्तिगत जानकारी को प्रोसेस करने की सहमति देता/देती हूं',
	'authorization_form.data_consent.options.yes': 'हाँ',
	'authorization_form.data_consent.options.no': 'नहीं',
	'authorization_form.validation.consent_required': 'कृपया सहमति दें',
	'authorization_form.validation.yes_required':
		"कृपया आगे बढ़ने के लिए 'हाँ' चुनें",
	'authorization_form.validation.required': 'आवश्यक',
	'consent_form.title': '\nकृपया नियम व शर्तों की सहमति दें',
	'consent_form.validation.consent_required':
		'कृपया प्रस्तुतिकरण के लिए सहमति दें',
	'consent_form.terms.program_eligibility': null,
	'consent_form.terms.nationality': null,
	'consent_form.terms.non_transferable': null,
	'consent_form.terms.enrollment_discretion': null,
	'consent_form.terms.services': null,
	'consent_form.terms.voluntary_participation': null,
	'consent_form.terms.liability': null,
	'consent_form.terms.rights_reserved': null,
	'consent_form.terms.patient_rights': null,
	'consent_form.terms.reimbursement': null,
	'consent_form.terms.misrepresentation': null,
	'consent_form.terms.free_doses': null,
	'consent_form.buttons.agree': null,
	'doc_esign.title': 'नामांकन प्राधिकरण',
	'doc_esign.aadhar_esign.title': 'क्या है आधार आधारित ई-साइनिंग',
	'doc_esign.aadhar_esign.description':
		'आधार-आधारित ई-हस्ताक्षर भारत में इलेक्ट्रॉनिक हस्ताक्षर का एक रूप है जो किसी व्यक्ति के आधार (12 अंकों की विशिष्ट पहचान संख्या) और दस्तावेजों पर डिजिटल हस्ताक्षर करने के लिए आधार प्रणाली के माध्यम से प्रमाणीकरण का लाभ उठाता है',
	'doc_esign.steps.title': 'प्रक्रिया',
	'doc_esign.steps.list.step1':
		'मेरे नामांकन फॉर्म पर हस्ताक्षर करें" नीचे दिए गए बटन पर क्लिक करें',
	'doc_esign.steps.list.step2':
		'दस्तावेज़ के बाएँ शीर्ष कोने पर पीले रंग में दिखाई देने वाले प्रारंभ बटन पर क्लिक करें',
	'doc_esign.steps.list.step3': 'ई-साइन सेक्शन पर क्लिक करें',
	'doc_esign.steps.list.step4': 'OTP स्टेप्स को फॉलो करें और सबमिट करें',
	'doc_esign.note.prefix': 0.0,
	'doc_esign.note.text':
		'नामांकन फॉर्म पर हस्ताक्षर के लिए आगे बढ़ने से पहले स्थान की अनुमति की आवश्यकता होती है',
	'doc_esign.button': 'मेरे नामांकन प्रपत्र पर हस्ताक्षर करें',
	'doc_esign.compatibility_error':
		'डिवाइस संगतता त्रुटि। ओह! ऐसा लगता है कि आप किसी गैर-देशी डिवाइस से इस सेवा तक पहुँचने का प्रयास कर रहे हैं। सर्वोत्तम प्रदर्शन और सर्वोत्तम उपयोगकर्ता अनुभव सुनिश्चित करने के लिए, कृपया समर्थित देशी डिवाइस पर हमारी सेवा का उपयोग करें। यदि आपके कोई प्रश्न हैं या आपको अतिरिक्त सहायता की आवश्यकता है, तो हमारी सहायता टीम सहायता के लिए यहाँ है। आपकी समझ के लिए धन्यवाद!',
	'profile.title': 'प्रोफ़ाइल',
	'profile.sections.my_profile': 'मेरी प्रोफाइल',
	'profile.sections.order_history': 'ऑर्डर इतिहास',
	'my_profile.title': 'मेरी प्रोफाइल',
	'my_profile.toast.success':
		'सशुल्क ऑर्डर के लिए सफलतापूर्वक अनुरोध किया गया.',
	'my_profile.sections.personal_details.title': 'व्यक्तिगत विवरण',
	'my_profile.sections.personal_details.fields.name': 'पूरा नाम',
	'my_profile.sections.personal_details.fields.gender': 'लिंग',
	'my_profile.sections.personal_details.fields.dob': 'जन्म तिथि',
	'my_profile.sections.personal_details.fields.mobile': 'मोबाइल नंबर',
	'my_profile.sections.personal_details.fields.email': 'ईमेल आईडी',
	'my_profile.sections.personal_details.fields.age': 'आयु',
	'my_profile.sections.personal_details.fields.address': 'निवास का पता',
	'my_profile.sections.personal_details.fields.city': 'शहर',
	'my_profile.sections.personal_details.fields.state': 'राज्य',
	'my_profile.sections.personal_details.fields.pin_code': 'पिन कोड',
	'my_profile.sections.personal_details.fields.relation': 'संबंध',
	'my_profile.sections.personal_details.fields.contact_number': 'संपर्क नंबर',
	'my_profile.sections.address.title': 'निवास का पता',
	'my_profile.sections.address.fields.address_line_1': 'पता पंक्ति 1 दर्ज करें',
	'my_profile.sections.address.fields.address_line_2': 'पता पंक्ति 2 दर्ज करें',
	'my_profile.sections.address.fields.city': 'शहर',
	'my_profile.sections.address.fields.state': 'राज्य',
	'my_profile.sections.address.fields.pin_code': 'पिन कोड',
	'my_profile.sections.caregiver.title': 'केयरगिवर',
	'my_profile.sections.caregiver.fields.name': 'पूरा नाम',
	'my_profile.sections.caregiver.fields.gender': 'लिंग',
	'my_profile.sections.caregiver.fields.dob': 'जन्म तिथि',
	'my_profile.sections.caregiver.fields.mobile': 'मोबाइल नंबर',
	'my_profile.sections.caregiver.fields.email': 'ईमेल आईडी',
	'my_profile.sections.caregiver.fields.relation': 'संबंध',
	'my_profile.sections.caregiver.fields.address_line_1':
		'पता पंक्ति 1 दर्ज करें',
	'my_profile.sections.caregiver.fields.address_line_2':
		'पता पंक्ति 2 दर्ज करें',
	'my_profile.sections.caregiver.fields.city': 'शहर',
	'my_profile.sections.caregiver.fields.state': 'राज्य',
	'my_profile.sections.caregiver.fields.pin_code': 'पिन कोड',
	'my_profile.sections.reimbursement.title': 'प्रतिपूर्ति जानकारी',
	'my_profile.sections.reimbursement.fields.type': 'प्रतिपूर्ति का प्रकार',
	'my_profile.sections.reimbursement.fields.limits': 'प्रतिपूर्ति की सीमा',
	'my_profile.sections.reimbursement.fields.amount': 'प्रतिपूर्ति रकम',
	'my_profile.sections.reimbursement.fields.status': 'स्टेटस',
	'my_profile.sections.prescription.title': '\n\nप्रिस्क्रिप्शन विवरण',
	'my_profile.sections.prescription.fields.doctor_name': 'डॉक्टर का नाम',
	'my_profile.sections.prescription.fields.hospital_name': 'अस्पताल का नाम',
	'my_profile.sections.prescription.fields.prescription_date':
		'प्रिस्क्रिप्शन की तारीख',
	'my_profile.not_available': 'N/A',
	'my_profile.buttons.edit': 'संपादित करें',
	'my_profile.buttons.save': 'विवरण सहेजें',
	'my_profile.buttons.cancel': 'रद्द करें',
	'my_profile.validation.required': 'ह फ़ील्ड आवश्यक है',
	'my_profile.validation.invalid_email': 'अवैध ईमेल पता',
	'my_profile.validation.invalid_phone': 'अवैध फ़ोन नंबर',
	'order_history.title': 'ऑर्डर इतिहास',
	'order_history.active_order.title': 'सक्रिय ऑर्डर',
	'order_history.active_order.order_id': 'ऑर्डर आईडी',
	'order_history.active_order.status.dispatch': 'डिस्पैच',
	'order_history.past_orders.title': 'पिछले  ऑर्डर',
	'order_history.past_orders.filters.all': 'सभी',
	'order_history.past_orders.filters.paid': 'भुगतान किये गये ऑर्डर',
	'order_history.past_orders.filters.free': 'निःशुल्क ऑर्डर',
	'order_history.fields.order_date': 'ऑर्डर की तारीख',
	'order_history.fields.dispensed_date': 'वितरित तिथि',
	'order_history.fields.dosage': 'औषधि की खुराक',
	'order_history.fields.distributor': 'दवा वितरक',
	'order_history.fields.pharmacy': 'फार्मेसी',
	'order_history.fields.infusion_date': 'आसव की तारीख',
	'order_history.card.more': 'अधिक...',
	'order_history.card.less': 'कम…',
	'order_history.card.order_advice': 'ऑर्डर सलाह दस्तावेज़',
	'order_history.not_available': 'N/A',
	'home.program_details.title': 'कार्यक्रम का विवरण',
	'home.program_details.program_name.active_badge': 'सक्रिय',
	'home.program_details.fields.patient_id': 'रोगी आईडी',
	'home.program_details.fields.enrolled_date': 'नामांकन की तारीख',
	'home.program_details.fields.remaining_infusions': 'शेष इन्फ्यूजन',
	'home.program_details.fields.doctor_name': 'डॉक्टर का नाम',
	'home.recent_order.title': 'वर्तमान  ऑर्डर',
	'home.recent_order.order_id_prefix': 'ऑर्डर आईडी',
	'home.recent_order.status.paid': 'भुगतान किये गये ऑर्डर',
	'home.recent_order.status.free': 'निःशुल्क ऑर्डर',
	'home.recent_order.actions.resend_otp': 'ओटीपी दोबारा भेजें',
	'home.recent_order.actions.confirm_infusion': 'इन्फ्यूजन की पुष्टि करें',
	'home.recent_order.fields.order_date': 'ऑर्डर की तारीख',
	'home.recent_order.fields.order_code': 'ऑर्डर कोड',
	'home.recent_order.fields.distributor': 'दवा वितरक',
	'home.recent_order.fields.pharmacy': 'फार्मेसी',
	'home.oasis_section.title': 'अधिक - ',
	'home.oasis_section.program_name': 'OPDYTA® रोगी सहायता कार्यक्रम (PAP)',
	'home.oasis_section.view_all': 'सभी देखें',
	'home.oasis_section.tags.pv_reporting':
		'पीवी रिपोर्टिंग / \nफार्माकोविजिलेंस रिपोर्टिंग',
	'home.order_success': 'ऑर्डर अनुरोध सफलतापूर्वक उत्पन्न हो गया है',
	'home.buttons.confirm_infusion': 'इन्फ्यूजन की पुष्टि करें',
	'home.buttons.request_order': 'दवा के लिए अनुरोध आदेश',
	'profile_modal.logout': 'लॉग आउट',
	'profile_modal.compatibility_error':
		'डिवाइस संगतता त्रुटि। ओह! ऐसा लगता है कि आप किसी गैर-देशी डिवाइस से इस सेवा तक पहुँचने का प्रयास कर रहे हैं। सर्वोत्तम प्रदर्शन और सर्वोत्तम उपयोगकर्ता अनुभव सुनिश्चित करने के लिए, कृपया समर्थित देशी डिवाइस पर हमारी सेवा का उपयोग करें। यदि आपके कोई प्रश्न हैं या आपको अतिरिक्त सहायता की आवश्यकता है, तो हमारी सहायता टीम सहायता के लिए यहाँ है। आपकी समझ के लिए धन्यवाद!',
	'ekyc_pending.notification.message':
		'आपने अपना भुगतान किया हुआ इन्फ्यूजन पूरा कर लिया है, ',
	'ekyc_pending.notification.highlight':
		'कृपया अगले ऑर्डर पर कार्रवाई करने के लिए',
	'ekyc_pending.notification.continuation': ' अपना दूरस्थ सत्यापन पूरा करें।',
	'ekyc_pending.verification.title': 'अपना सत्यापन पूर्ण करें',
	'ekyc_pending.button.start': 'ईकेवाईसी शुरू करें',
	'ekyc_pending.mobile_status.linked': 'आधार कार्ड से लिंक मोबाइल नंबर',
	'ekyc_pending.mobile_status.not_linked':
		'मोबाइल नंबर आधार कार्ड से लिंक नहीं है',
	'ekyc_pending.error.device_compatibility':
		'डिवाइस संगतता त्रुटि। ओह! ऐसा लगता है कि आप किसी गैर-देशी डिवाइस से इस सेवा तक पहुँचने का प्रयास कर रहे हैं। सर्वोत्तम प्रदर्शन और सर्वोत्तम उपयोगकर्ता अनुभव सुनिश्चित करने के लिए, कृपया समर्थित देशी डिवाइस पर हमारी सेवा का उपयोग करें। यदि आपके कोई प्रश्न हैं या आपको अतिरिक्त सहायता की आवश्यकता है, तो हमारी सहायता टीम सहायता के लिए यहाँ है। आपकी समझ के लिए धन्यवाद!',
	'physical_kyc.notification.message':
		'आपने अपना पहला इन्फ्यूजन पूरा कर लिया है, ',
	'physical_kyc.notification.highlight':
		'कृपया अगले ऑर्डर को संसाधित करने के लिए',
	'physical_kyc.notification.continuation': ' अपना भौतिक सत्यापन पूरा करें।',
	'physical_kyc.verification.title': 'सत्यापन लंबित है',
	'physical_kyc.verification.status':
		'PSP टीम जल्द ही सत्यापन के लिए संपर्क करेगी',
	'physical_kyc.process.title': '',
	'program_enrollment_success.notification.message':
		'आपने अपना कार्यक्रम विवरण सफलतापूर्वक जमा कर दिया है।',
	'program_enrollment_success.notification.highlight1':
		'आपके दस्तावेज़ों का मूल्यांकन चल रहा है',
	'program_enrollment_success.notification.highlight2': 'PSP टीम ',
	'program_enrollment_success.notification.continuation':
		'स्वीकृति मिलने पर आपको अगले चरण के बारे में सूचित कर दिया जाएगा!',
	'program_enrollment_success.status.title':
		'आपके विवरण और दस्तावेजों का मूल्यांकन हो रहा है कृपया प्रतीक्षा करें',
	'program_enrollment_success.status.subtitle': null,
	'program_enrollment_success.about.title':
		'संभव - OPDYTA® रोगी सहायता कार्यक्रम (PAP) पर अधिक जानकारी',
	'program_enrollment_success.about.program_name':
		'संभव - OPDYTA® रोगी सहायता कार्यक्रम (PAP) पर अधिक जानकारी',
	'program_enrollment_success.about.description':
		'बीएमएस मरीजों की मदद करने के लिए प्रतिबद्ध है। बीएमएस दुनिया भर में स्वास्थ्य असमानताओं को कम करने और दवा तक वैश्विक पहुंच बढ़ाने के लिए कई कार्यक्रम चलाता है। बीएमएस इंडिया ने भारत में एक अनुमोदित संकेत में एक पंजीकृत ऑन्कोलॉजिस्ट द्वारा निर्धारित ओपीडीवाईटीए® (निवोलुमैब) रोगियों के लिए ओपीडीवाईटीए® पीएसपी पेश किया है, यदि पात्रता मानदंड पूरे होते हैं।',
	'program_enrollment_success.notification.by': '',
	'request_callback.modal.title': 'कॉल बैक का अनुरोध करें.',
	'request_callback.form.date.label': 'तारीख',
	'request_callback.form.date.placeholder': 'दिनांक/माह/वर्ष',
	'request_callback.form.date.error': 'तारीख आवश्यक है',
	'request_callback.form.time_slot.label': 'टाइम स्लॉट',
	'request_callback.form.time_slot.placeholder': 'टाइम स्लॉट चुनें',
	'request_callback.form.time_slot.error': 'टाइम स्लॉट आवश्यक है',
	'request_callback.form.note.label': 'ध्यान दें',
	'request_callback.form.note.placeholder': 'अतिरिक्त टिप्पणी यहां दर्ज करें',
	'request_callback.form.note.error': 'नोट जरूरी है',
	'request_callback.form.submit': ' सबमिट',
	'request_callback.notifications.success':
		'पुनः कॉल करने का अनुरोध किया गया। PAP टीम अगले चरणों के लिए आपसे संपर्क करेगी',
	'request_order.modal.title': 'दवा के लिए अनुरोध आदेश',
	'request_order.form.description':
		'अगले दो घंटों में पीएसपी टीम आपको ऑर्डर की पुष्टि और जनरेट करने के लिए कॉल करेगी',
	'request_order.form.submit': ' सबमिट',
	'request_order.form.prescription_change.text': 'प्रिस्क्रिप्शन में परिवर्तन',
	'request_order.form.prescription_change.action': 'कॉल बैक का अनुरोध करें.',
	'request_order.notifications.success':
		'ऑर्डर अनुरोध सफलतापूर्वक सबमिट किया गया',
	'request_order.notifications.error': 'आदेश अनुरोध प्रस्तुत करने में विफल',
	'enroll_success.title': 'आपका खाता सफलतापूर्वक बन गया',
	'enroll_success.subtitle':
		'अब, आइए प्रोग्राम में नामांकन के लिए अपनी प्रोफ़ाइल पूरी करें',
	'enroll_success.description': 'विवरण भरें और स्वीकृति के लिए भेजें।',
	'enroll_success.program.title':
		'आपने संभव रोगी सहायता कार्यक्रम में नामांकन कराया है',
	'enroll_success.program.names.shambhav': 'संभव ',
	'enroll_success.program.names.aarambh': 'आरंभ',
	'enroll_success.buttons.get_started': 'आरंभ करें',
	'upload_infusion_card.title': 'इन्फ्यूशन कार्ड अपलोड करें',
	'upload_infusion_card.submit': 'जमा करें',
};