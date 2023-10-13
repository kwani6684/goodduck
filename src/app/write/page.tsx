import Date from "@/pages/api/date"

export default function Write() {
    
    return (
        <div>
            <h4>글작성</h4>
            <form action="api/test" method="GET">
                <button type="submit">button</button>
            </form>
            <form action="api/date" method="GET">
                <button type="submit">date</button>
            </form>
            <form action="api/postContent" method="post">
                <input name='title' className='border'></input>
                <input name="content" className='border'></input>
                <button type="submit">submit</button>
            </form>
        </div>
    )
}