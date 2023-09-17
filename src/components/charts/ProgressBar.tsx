import React from 'react';
import {Progress} from 'flowbite-react';

type ProgressDataType = {
    percent: number;
    label: string;
}

const ProgressBar:React.FC<ProgressDataType> = ({percent, label}) => {
  return (
    <div>
        <Progress labelProgress labelText 
        progress={percent} progressLabelPosition="inside" size="lg"
        textLabel={label} textLabelPosition="outside"/>
    </div>
  )
}

export default ProgressBar