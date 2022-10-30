import { Box, Input, Button, Textarea ,Alert, AlertIcon, Tooltip} from "@chakra-ui/react";
import { useState } from "react";
import styles from "./create.module.css";

export default function CreateBlog() {
    const [alert, setAlert] = useState(false);
    const handleAlert = ()=>{
        setAlert(true);
        setTimeout(()=>{
            setAlert(false);
        },500)
    }
    return (<>
        {alert &&
            <>
                <Alert status='info'>
                    <AlertIcon />
                    Feature is under progress
                </Alert>
            </>}
        <Box className={styles.parent}>
            <Box>
                <Tooltip label="This feature is under progress">
                    <Button onClick={handleAlert}>Add cover image</Button>
                </Tooltip>
                <Input placeholder="New Post Title here..." variant={"unstyled"} />
                <Textarea placeholder="write your post content here..." />
            </Box>
            <Box></Box>
        </Box>
    </>)
}