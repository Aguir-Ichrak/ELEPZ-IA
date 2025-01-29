import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; 

export default function BlogCard({ title, category, content, image ,id }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/details/${id}`)
  };

  return (
    <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src={image || "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"}
          className="w-full h-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography variant="h6" color="blue-gray" className="mb-2">
          {category}
        </Typography>
        <Typography>
          <span
            dangerouslySetInnerHTML={{
              __html: content.length > 100 ? `${content.substring(0, 100)}...` : content,
            }}
          />
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button className="bg-indigo-800" onClick={handleClick}>
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
}

BlogCard.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  image: PropTypes.string,
};
