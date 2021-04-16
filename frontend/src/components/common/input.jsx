import Form from "react-formal";

const Input = ({type, name, label}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <Form.Field type={type} name={name} id={name} className="form-control"/>
            <span><Form.Message for={name} className="text-danger"/></span>
        </div>
    )
};

export default Input;
