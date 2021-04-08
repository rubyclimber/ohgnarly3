import {getFormats} from '../../services/format';

describe('getFormats', () => {
    it('should contain VHS', () => {
        expect(getFormats().VHS).toEqual('VHS');
    });

    it('should contain Blu-ray', () => {
        expect(getFormats().Bluray).toEqual('Blu-ray');
    });

    it('should contain Blu-ray 3D', () => {
        expect(getFormats().Bluray3d).toEqual('Blu-ray 3D');
    });

    it('should contain Blu-ray 4K', () => {
        expect(getFormats().Bluray4k).toEqual('Blu-ray 4K');
    });

    it('should contain Digital SD', () => {
        expect(getFormats().DigitalSd).toEqual('Digital SD');
    });

    it('should contain Digital HD', () => {
        expect(getFormats().DigitalHd).toEqual('Digital HD');
    });

    it('should contain Digital UHD', () => {
        expect(getFormats().DigitalUhd).toEqual('Digital UHD');
    });

    it('should contain DVD', () => {
        expect(getFormats().DVD).toEqual('DVD');
    });
});