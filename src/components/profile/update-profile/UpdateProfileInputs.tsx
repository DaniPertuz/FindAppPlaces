import React from 'react';
import { ScrollView, View } from 'react-native';

import { useUpdateProfileProps } from '../../../hooks';
import { IPlace } from '../../../interfaces';

import AddressInput from '../forms/address-input';
import DefaultInput from '../forms/default-input';
import DisabledInput from '../forms/disabled-input';
import DropdownCategory from '../forms/dropdown';
import ImagesGallery from '../forms/images-gallery';
import Label from '../forms/label';
import PasswordInput from '../forms/password-input';
import Scheduler from '../forms/scheduler';
import SubmitButton from '../ui/SubmitButton';
import UpdateProfileDescriptionInput from '../forms/description';
import WarningMessage from '../../ui/WarningMessage';

import { styles } from './styles';

interface Props {
    place: IPlace;
}

const UpdateProfileInputs = ({ place }: Props) => {
    const {
        address,
        confirmPassword,
        description,
        instagram,
        loading,
        name,
        other,
        password,
        phone,
        placeCategory,
        validPassword,
        whatsapp,
        handlePicsFromGallery,
        handleSchedule,
        onAddressBlur,
        onChange,
        onSubmit,
        setPlaceCategory
    } = useUpdateProfileProps({ place });

    return (
        <ScrollView contentContainerStyle={styles.containerPaddingBottom} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always'>
            <View style={styles.mediumMarginTop}>
                <Label value='Descripción' />
                <UpdateProfileDescriptionInput description={description} onChange={onChange} />
                <View style={styles.mediumMarginTop}>
                    <Label value='Nombre de la empresa' />
                    <DefaultInput field={name} fieldValue='name' placeholder='Nombre de la empresa' icon='Users' keyboardType='default' onChange={onChange} />
                </View>
                <View style={styles.mediumMarginTop}>
                    <Label value='Correo corporativo' />
                    <DisabledInput email={place.email} />
                </View>
                <View style={styles.mediumMarginTop}>
                    <Label value='Dirección' />
                    <AddressInput field={address} onBlur={onAddressBlur} onChange={onChange} />
                </View>
                <View style={styles.mediumMarginTop}>
                    <Label value='Categoría' />
                    <DropdownCategory field={placeCategory} handlePlaceCategory={setPlaceCategory} />
                    {(placeCategory === 'Otro') &&
                        <View style={styles.mediumMarginTop}>
                            <DefaultInput field={other} fieldValue='other' placeholder='Escribe tu categoría' icon='Mall' keyboardType='default' onChange={onChange} />
                        </View>
                    }
                    <View style={styles.mediumMarginTop}>
                        <Label value='Horario' />
                        <Scheduler place={place} handleSchedule={handleSchedule} />
                    </View>
                </View>
                <View style={styles.mediumMarginTop}>
                    <Label value='Imágenes' />
                    <ImagesGallery place={place} handlePicsFromGallery={handlePicsFromGallery} />
                </View>
                <View style={styles.mediumMarginTop}>
                    <Label value='Teléfono' />
                    <DefaultInput field={phone} fieldValue='phone' placeholder='Escribe el teléfono' icon='Phone' keyboardType='phone-pad' onChange={onChange} />
                </View>
                {(place.premium !== 1) &&
                    <>
                        <View style={styles.mediumMarginTop}>
                            <Label value='WhatsApp' />
                            <DefaultInput field={whatsapp!} fieldValue={'name'} placeholder={'WhatsApp'} icon={'Whatsapp'} keyboardType={'number-pad'} onChange={onChange} />
                        </View>
                        <View style={styles.mediumMarginTop}>
                            <Label value='Instagram' />
                            <DefaultInput field={instagram!} fieldValue={'name'} placeholder={'Instagram'} icon={'Instagram'} keyboardType={'default'} onChange={onChange} />
                        </View>
                    </>
                }
                <View style={styles.mediumMarginTop}>
                    <Label value='Contraseña' />
                    <PasswordInput field={password} fieldValue={'password'} placeholder='Escribe tu contraseña' onChange={onChange} />
                </View>
                <View style={styles.mediumMarginTop}>
                    <Label value='Repetir contraseña' />
                    <PasswordInput field={confirmPassword} fieldValue={'confirmPassword'} placeholder='Repite tu contraseña' onChange={onChange} />
                </View>
                {(!validPassword) &&
                    <WarningMessage warningText='Contraseñas no coinciden' />
                }
                <SubmitButton onPress={onSubmit} value='Guardar cambios' loading={loading} />
            </View>
        </ScrollView>
    );
};

export default UpdateProfileInputs;