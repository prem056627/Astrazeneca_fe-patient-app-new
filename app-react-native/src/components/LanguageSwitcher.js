import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = async (lng) => {
    try {
      await i18n.changeLanguage(lng);
      console.log('Language changed to:', lng);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
		<SafeAreaView style={{ width: '100%', position: 'relative', zIndex: 100 }}>
			<View style={styles.container}>
				<Text style={styles.LabelText}>Select Language:</Text>
				<TouchableOpacity
					style={[
						styles.languageButton,
						i18n.language === 'en' && styles.activeButton,
					]}
					onPress={() => changeLanguage('en')}
				>
					<Text
						style={[
							styles.buttonText,
							i18n.language === 'en' && styles.activeText,
						]}
					>
						English
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.languageButton,
						i18n.language === 'hi' && styles.activeButton,
					]}
					onPress={() => changeLanguage('hi')}
				>
					<Text
						style={[
							styles.buttonText,
							i18n.language === 'hi' && styles.activeText,
						]}
					>
						हिंदी
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		// padding: 10,
		backgroundColor: 'rgba(255, 255, 255,1)',
		// position: 'relative',
		width: '100%',
		height: 80,
		// top: 40,
		// left: 0,
		// right: 0,
		zIndex: 1000,
		marginBottom: Platform.OS === 'ios' ?  -16 : 0
	},
	languageButton: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		marginHorizontal: 5,
		borderRadius: 20,
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#7C084B',
		minWidth: 100,
		alignItems: 'center',
	},
	activeButton: {
		backgroundColor: '#7C084B',
	},
	buttonText: {
		fontSize: 16,
		color: '#333',
		fontWeight: '600',
	},
	LabelText: {
		fontSize: 16,
		color: '#333',
		fontWeight: '400',
	},
	activeText: {
		color: '#fff',
	},
});

export default LanguageSwitcher;
