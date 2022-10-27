import { Box, Image, Icon, Button, Textarea } from "@chakra-ui/react"
import { ChatIcon } from "@chakra-ui/icons"
import { AiOutlineLike } from "react-icons/ai"
import styles from "./article.module.css";
import { x } from "./Article";
import { useState } from "react";

let Username = "Deng lak"
export default function Reviews() {
    const [box, setBox] = useState(false);
    return (<>
        <Box className={styles.reviews}>
            <Image src={x} />
            <Box>
                <Box>
                    <Box>Username</Box>
                    <Box>
                        I have to say, it's so nice that "lazy" finally is an attribute.
                        Using the intersect API to judge when to load an image was so hard in the past.
                    </Box>
                </Box>
                <Box>
                    <Box>
                        <Box><Icon as={AiOutlineLike} /></Box>
                        <Box>like</Box>
                    </Box>
                    <Box onClick={() => setBox(!box)}>
                        <Box ><ChatIcon /></Box>
                        <Box>reply</Box>
                    </Box>
                </Box>
                {!box ? null :
                    <Box>
                        <Textarea placeholder={`reply to ${Username}`} />
                        <Box mt={3}>
                            <Button colorScheme="blue">Submit</Button>
                            <Button ml={5}>Preview</Button>
                            <Button ml={5} colorScheme="red" onClick={() => setBox(!box)}>Dismiss</Button>
                        </Box>

                    </Box>
                }
            </Box>
        </Box>
    </>)
}