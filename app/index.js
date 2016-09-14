import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View,
    ListView,
    ActivityIndicator,
} from 'react-native';

const firebaseDbh = require ( './firebaseconfig');

// Rendering a row
const WORow = ({name, reps, repDesc, test}) => (
        <View style={{flexDirection: 'row', margin: 8, backgroundColor: 'white'}}>
        <Text style={{
            flex: 7, margin:8, fontSize: 20, fontWeight: '500',
            textAlignVertical: 'center'
        }} numberOfLines={4}>
        {name}
    </Text>
        <View>
        <Text style={{textAlign: 'right', fontSize: 26, margin: 8, fontWeight: 'bold'}}>{reps}</Text>
        <Text style={{fontSize: 16, margin: 8, color: 'orange'}}>{repDesc}</Text>
        </View>
        </View>
);

export default class Workout extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {loading: true, dbh: firebaseDbh, dataSource: ds};
    }
    componentDidMount() {
        var dbref = this.state.dbh.ref('workout/warmup');
        this.setState ( {dbulref: dbref});
        dbref.on('value', (e) => {
            var rows = [];
            if ( e && e.val() && e.val().map ) {
                e.val().map((v) => rows.push ( v ));
            }
            var ds = this.state.dataSource.cloneWithRows(rows);
            this.setState({
                dataSource: ds,
                loading: false
            });
        });
    }
    componentDidUnMount() {
        this.state.dbulref.off('value');
    }
    renderRow (rd) {
        return <WORow name={rd.Name} reps={rd.Reps} repDesc={rd.RepDesc}/>;
    }
    render() {
        if ( this.state.loading ) {
            return (
                    <View style={{flex: 1, justifyContent:'center'}}>
                    <ActivityIndicator size="large"/>
                    <Text style={{textAlign: 'center'}}>Loading</Text>
                    </View>
            );
        }
        return (
                <View style={{flex:1}}>
                <ListView dataSource={this.state.dataSource} style={{backgroundColor: 'lightgray'}}
            renderRow={(rowData) => this.renderRow(rowData)}
                />
                </View>
        );
    }
}
