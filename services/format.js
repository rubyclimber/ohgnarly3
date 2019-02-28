const formats = {
    DVD: 'DVD',
    Bluray: 'Blu-ray',
    Bluray3d: 'Blu-ray 3D',
    Bluray4k: 'Blu-ray 4K',
    DigitalSd: 'Digital SD',
    DigitalHd: 'Digital HD',
    DigitalUhd: 'Digital UHD',
    VHS: 'VHS'
};

module.exports.getFormats = () => {
    return formats;
}