import React from 'react';
import { Form, Button, Modal, Input, Select } from 'antd';

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: API.ArticleListParams) => void;
  onSubmit: (values: API.ArticleListParams) => void;
  updateModalVisible: boolean;
  values: API.ArticleListParams;
}
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const submit = async () => {
    const fieldsValue = await form.validateFields();
    handleUpdate({ ...values, ...fieldsValue });
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="title"
          label="标题"
          rules={[
            {
              required: true,
              message: '请输入标题！',
            },
          ]}
        >
          <Input />
        </FormItem>
        <FormItem
          name="type"
          label="类型"
          rules={[
            {
              required: true,
              message: '请选择类型！',
            },
          ]}
        >
          <Select>
            <Select.Option value="0">原创</Select.Option>
            <Select.Option value="1">转载</Select.Option>
          </Select>
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => submit()}>
          完成
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      title="修改"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
      destroyOnClose
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          title: props.values.title,
          type: props.values.type,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;