export class User{
    constructor(
        public email: string,
        public password: string,
        public nickname: string,
        public id?: string,
    ) {
        if (!id) {
            this.id = crypto.randomUUID()
        }
    }


    update(props: {email: string | undefined, nickname: string | undefined}) {
        Object.entries(props).forEach(([key, value]) => {
            if (value !== undefined) {
                (this as any)[key] = value
            }
        })
    }
}
