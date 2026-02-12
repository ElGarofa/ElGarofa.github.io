export function generarConsejos(usuario) {

  const consejos = [];

  if (!usuario.premium)
    consejos.push("Ser premium aumenta tu visibilidad un 40%");

  if (usuario.likesDados.length < 5)
    consejos.push("Interactuá más perfiles para mejorar tu ranking");

  if (usuario.hobbies.length < 3)
    consejos.push("Agregá más hobbies a tu perfil");

  return consejos;
}
