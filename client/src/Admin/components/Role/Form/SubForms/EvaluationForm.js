import React from 'react';
import {RestForm, Forms} from 'react-at-rest';
import {Button, Tooltip, OverlayTrigger, Panel} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import TextInputForm from './TextInputForm';
import StandardForm from './StandardForm';

const AddButton = (<OverlayTrigger placement="left"
    overlay={(<Tooltip placement="top" className="in" id="tooltip-top">
        اضف درجة
    </Tooltip>) }
    >
    <Button
        bsStyle='success'
        >
        اضف  درجة
        <FontAwesome name='plus' />
    </Button>
</OverlayTrigger>);

export default class EvaluationForm extends RestForm {
    render() {
        return <Panel className="evalWrapper" header={"تقويم #" + this.props.displayIndex}>
            <Forms.TextInput {...this.getFieldProps('strategy') }
                label="استراتيجة التقييم"
                />
            <Forms.TextInput {...this.getFieldProps('tool') }
                label="اداة التقييم"
                />
            <Forms.TextAreaInput {...this.getFieldProps('notes') } label="ملاحظات"/>
                        <Forms.Label label=" درجات التقييم"/>
            <Forms.SubFormArray
                {...this.getFieldProps('grades') }
                addResourceButton={AddButton}>
                <TextInputForm />
            </Forms.SubFormArray>
            <Forms.Label
                label="المعايير"
                />
            <Forms.SubFormArray
                {...this.getFieldProps('standards') }
                addResourceButton={(<Button
                    bsStyle='info'
                    style={{ margin: 10 }}
                    >
                    <FontAwesome name='plus' />
                    اضف معيار
                </Button>) }>
                <StandardForm />
            </Forms.SubFormArray>

            <Forms.Label
                label="الاسئلة"
                />
            <Forms.SubFormArray
                {...this.getFieldProps('questions') }
                addResourceButton={<Button
                    bsStyle='info'
                    style={{ marginTop: 10 }}
                    >
                    <FontAwesome name='plus' />
                    اضف سؤال
                </Button>}>
                <TextInputForm />
            </Forms.SubFormArray>
            <OverlayTrigger placement="left"
                overlay={(<Tooltip placement="top" className="in">
                    ازالة البند
                </Tooltip>) }
                >
                <Button
                    bsStyle='danger'
                    style={{ margin: 10 }}
                    onClick={this.props.onRemove}>
                    <FontAwesome name='minus' />
                    مسح التقييم
                </Button>
            </OverlayTrigger>
        </Panel>
    }
}
