import { Stream } from "stream";

const getBusboyData = (busboy: any) => {

    type dataType = {
        file: Stream,
        fileobj: any,
        formData: Map<any, any>
    }

    return new Promise<dataType>((resolve, reject) => {

        const formData = new Map();

        busboy.on("field", (field: any, val: any) => {

            formData.set(field, val)

        });

        busboy.on("file", async(_: string, file: Stream, fileobj: any) => {

            resolve({
                file,
                fileobj,
                formData
            })
        })

    })
}

export default getBusboyData;