import React from 'react';

import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';

class MovieList extends React.Component{
    render(){
        return(
            <List>
                <ListItem>
                    <TextField
                        label="Search"
                        placeholder="Enter title or name"
                        fullWidth
                        onChange={(event) => this.props.changeSearchQuery(event.target.value)}
                    >
                        {this.props.searchQuery}
                    </TextField>
                </ListItem>
            {
                this.props.movies.map(el => {
                    if(!this.props.searchQuery || this.props.shouldShow(el)){
                        return (
                            <ListItem
                                button key = {el._id}
                                onClick={() => {
                                    this.props.selectMovie(el);
                                    this.props.closeDrawer();
                                }}
                            >
                                <Avatar style={{height: '40px'}}>
                                    {el.name.charAt(0).toUpperCase()}
                                </Avatar>
                                <ListItemText
                                    style={{textAlign: 'left'}}
                                    primary={el.name}
                                    secondary={el.year}
                                />
                            </ListItem>
                        )
                    }
                })
            }
            </List>
        )
    }
}

export default MovieList;