import { Box, Image, Icon, Button, Textarea } from "@chakra-ui/react"
import { ChatIcon } from "@chakra-ui/icons"
import { AiOutlineLike } from "react-icons/ai"
import styles from "./article.module.css";
import { x } from "./Article";
import { useState } from "react";

let Username = "Deng lak"
export default function Reviews(props) {
    const [box, setBox] = useState(false);
    return (<>
        <Box className={styles.reviews}>
            <Image src={x} />
            <Box>
                <Box>
                    <Box>{props?.username}</Box>
                    <Box>
                        {props?.comment}
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
                {props?.reply ? <Checker username={props?.reply?.username} reply={props?.reply?.reply} /> : null}
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

const Checker = ({ username, reply }) => {
    return (<>
        <Box className={styles.reviews}>
            <Image src={x} />
            <Box>
                <Box>
                    <Box>{username}</Box>
                    <Box>
                        {reply}
                    </Box>
                </Box>
                
            </Box>

        </Box>

    </>)
}