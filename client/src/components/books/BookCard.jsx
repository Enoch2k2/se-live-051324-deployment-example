import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const BookCard = ({ book }) => {

  return (
    <Grid item xs={4}>
      <Card variant="outlined">
        <CardHeader
          title={book.title}
        />
        <CardContent>
          <p>By: {book.author.name}</p>
          <p>Released? { book.released ? "Yes" : "No" }</p>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default BookCard