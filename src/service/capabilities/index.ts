import { Inject } from "typescript-ioc"
import { FFmpegWrapper } from "../ffmpeg"
import {
    ICodec,
    IEncoder,
    IFFmpegCapabilities,
    IFFmpegCapabilitiesObject,
    IFilter,
    IFormat,
    TCapabilities,
    TCapabilitiesData
} from "../ffmpeg/interface"

export class CapabilityService {
    @Inject
    private ffmpegWrapper!: FFmpegWrapper
    async getAllCapabilities(): Promise<IFFmpegCapabilities> {
        const codecs = await this.getAvailableCodecs()
        const encoders = await this.getAvailableEncoders()
        const formats = await this.getAvailableFormats()
        const filters = await this.getAvailableFilters()
        return {
            codecs,
            encoders,
            filters,
            formats
        }
    }
    async getAvailableCodecs(): Promise<ICodec[]> {
        const data = await this.ffmpegWrapper.getAvailableCodecs()
        return this.nameCapability<ICodec>(data)
    }
    async getAvailableEncoders(): Promise<IEncoder[]> {
        const data = await this.ffmpegWrapper.getAvailableEncoders()
        return this.nameCapability<IEncoder>(data)
    }
    async getAvailableFilters(): Promise<IFilter[]> {
        const data = await this.ffmpegWrapper.getAvailableFilters()
        return this.nameCapability<IFilter>(data)
    }
    async getAvailableFormats(): Promise<IFormat[]> {
        const data = await this.ffmpegWrapper.getAvailableFormats()
        return this.nameCapability<IFormat>(data)
    }
    public nameCapability<T extends TCapabilities>(data: IFFmpegCapabilitiesObject<TCapabilitiesData>): T[] {
        const namedData = []
        for (const key in data) {
            const currentItem = data[key] 
            const namedElement: T = {
                ...currentItem,
                name: key
            } as T
            namedData.push(namedElement)
        }
        return namedData
    }
   
}