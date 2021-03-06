import React from 'react';
import { Actions, ActionConst } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
	View,
	Text,
	StyleSheet,
	ListView,
	Platform,
} from 'react-native';
import TopBar from '@components/TopBar';
import Row from './Row';
import Input from './Input';
import KeyboardSpacer from '@components/KeyboardSpacer';
import * as colors from '@colors';
import { myHeight, myWidth, firstLetter } from '@utils';
import demoData from '@components/demoData';

const ListMessages = props => {
	const { name, previewMessage, id } = props;

	const _onPressLeft = () => Actions.mainScreen({
		type: ActionConst.RESET,
	});

	const ds = new ListView.DataSource({
		rowHasChanged: (r1, r2) => r1.id !== r2.id,
	});

	const dataSource = ds.cloneWithRows(demoData);

	return (
		<View style={styles.container}>
			<TopBar 
				onPressLeft={_onPressLeft}
				iconLeftName="arrow-back"
			>
				<View style={[styles.circle, {backgroundColor: colors.random()}]}>
					<Text style={styles.shortText}>
						{firstLetter(name)}
					</Text>
				</View>
				<Text style={styles.name}>
					{name}
				</Text>
			</TopBar>
			<ListView
			  style={styles.listview}
			  contentContainerStyle={styles.listviewContainer}
			  dataSource={dataSource}
			  renderRow={(data) => <Row {...data} {...props} />}
			/>
			<Input />
			<KeyboardSpacer />
		</View>
	)
};


const BOTTOM_BLANK = (Platform.OS === 'ios') ? myHeight * 0.035 : 0;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginBottom: BOTTOM_BLANK,
		backgroundColor: colors.THIRD,
	},
	listview: {
		flex: 1,
	},
	listviewContainer: {
		paddingBottom: myWidth * 0.02,
	},
	circle: {
		alignItems: 'center',
		justifyContent: 'center',
		width: myWidth * 0.11,
		height: myWidth * 0.11,
		borderRadius: myWidth * 0.3,
		marginLeft: myWidth * 0.06,
		marginRight: myWidth * 0.03,
	},
	shortText: {
		color: colors.BASIC,
		fontWeight: 'bold',
		fontSize: myWidth * 0.05,
	},
	name: {
		fontSize: myWidth * 0.045,
		fontWeight: 'bold',
		color: colors.BASIC,
	}
});

export default ListMessages;