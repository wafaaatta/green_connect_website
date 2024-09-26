import { Text } from "lucide-react"
import TextArea from "./components/Textarea"

const Workspace = () => {
  return (
    <>
        <TextArea 
            placeholder="Enter a message..."
            icon={Text}
        />
    </>
  )
}

export default Workspace