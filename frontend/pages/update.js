import UpdateItem from "../components/UpdateItem"
const Update = ({query}) => {
    console.log('query', query)
    return <UpdateItem id={query.id}/>
};
export default Update;
