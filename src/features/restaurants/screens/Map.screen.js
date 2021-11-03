import React from "react"
import { Button, Text, View } from "react-native";
import Torch from 'react-native-torch';
import { changeCounter } from '../../../store/actions/counterActions';
import { useSelector, useDispatch } from 'react-redux';

export default function Map() {
    const dispatch = useDispatch()
    const counter = useSelector(state => state.counterReducer.counter)

    return (
        <View>
            <Button title='press me' onPress={() => Torch.switchState(this.isTorchOn = !this.isTorchOn)} />
            <Text>{counter}</Text>
            <Button title='Incremente counetr' onPress={() => dispatch(changeCounter(true))} />
            <Button title='Decremente counetr' onPress={() => dispatch(changeCounter())} />
        </View>
    )
}