import React, {Component} from 'react'
import {Mutation, Query} from "react-apollo"
import Router from "next/router"
import Form from "./styles/Form"
import gql from "graphql-tag"
import Error from "./ErrorMessage"

const SINGLE_ITEM_QUERY= gql`
query SINGLE_ITEM_QUERY($id: ID!){
    item(where: {id: $id}){
        id
        title
        description
        price
    }
}
`

const UPDATE_ITEM_MUTATION = gql `
mutation UPDATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    ){
    updateItem(
        title:$title
        description:$description
        price:$price
        ){
            id
            title
            description
            price
        }
    }
`;

class UpdateItem extends Component {
    state = {

    };
    handleChange = (e) => {
        const {name, type, value} = e.target
        console.log({name, type, value})
        const val = type === "number"
            ? parseFloat(value)
            : value
        this.setState({[name]: val})
    }
    updateItem=(e, updateItemMutation)=>{
        e.preventDefault
        console.log('uppppp', this.state)
    }

    render() {
        return (
            <Query query={SINGLE_ITEM_QUERY} variables={{id: this.props.id}}>
                {({data, loading})=>{
                    if(loading) return <p>Loading...</p>
                    if(!data.item) return <p>No Item Found</p>
                    return (
               <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
                {(updateItem, {loading, error, called}) => (
                    <Form
                        onSubmit={async(e) => this.updateItem(e, updateItem)}>
                        <Error error={error}/>
                        <fieldset disabled={loading} aria-busy={loading}>
                            <label htmlFor="title">
                                Title
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    required
                                    placeholder="Title"
                                    defaultValue={data.item.title}
                                    onChange={this.handleChange}
                                    required/>
                            </label>

                            <label htmlFor="price">
                                Price
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    required
                                    placeholder="Price"
                                    defaultValue={data.item.price}
                                    onChange={this.handleChange}
                                    required/>
                            </label>

                            <label htmlFor="description">
                                Description
                                <textarea
                                    type="text"
                                    id="description"
                                    name="description"
                                    required
                                    placeholder="Enter a  description"
                                    defaultValue={data.item.description}
                                    onChange={this.handleChange}
                                    required/>
                            </label >
                            <button type="submit">Submit</button>
                        </fieldset>
                    </Form>
                    )}
                </Mutation>
                    )
                }}
            </Query>
        )
    }
}

export {UPDATE_ITEM_MUTATION}
export default UpdateItem
