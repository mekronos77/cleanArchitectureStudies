export interface IUseCase<TProps, TOutput> {
    execute(props: TProps): Promise<TOutput>
}
