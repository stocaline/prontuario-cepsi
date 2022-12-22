const validateFieldName = (req, res, next) => {
    const { body } = req;
  
    if(body.nome == undefined){
      return res.status(400).json({message: 'the field "nome" is empty'});
    }
    if(body.nome == ''){
      return res.status(400).json({message: 'nome cannot be empty'});
    }
  
    next();
  };
  const validateFieldBirthDate = (req, res, next) => {
    const { body } = req;
  
    if(body.dataNascimento == undefined){
      return res.status(400).json({message: 'the field "dataNascimento" is required'});
    }
  
    if(body.dataNascimento == ''){
      return res.status(400).json({message: 'dataNascimento cannot be empty'});
    }
  
    next();
  };
  
  const validateFieldschooling = (req, res, next) => {
    const { body } = req;
  
    if(body.escolaridade == undefined){
      return res.status(400).json({message: 'the field "escolaridade" is required'});
    }
  
    if(body.escolaridade == ''){
      return res.status(400).json({message: 'escolaridade cannot be empty'});
    }
  
    next();
  };
  
  const validateFieldRg = (req, res, next) => {
    const { body } = req;
  
    if(body.rg == undefined){
      return res.status(400).json({message: 'the field "rg" is required'});
    }
  
    if(body.rg == ''){
      return res.status(400).json({message: 'rg cannot be empty'});
    }
  
    next();
  };
  
  const validateFieldCpf = (req, res, next) => {
    const { body } = req;
  
    if(body.cpf == undefined){
      return res.status(400).json({message: 'the field "cpf" is required'});
    }
  
    if(body.cpf == ''){
      return res.status(400).json({message: 'cpf cannot be empty'});
    }
  
    next();
  };
  
  const validateFieldDistrict = (req, res, next) => {
    const { body } = req;
  
    if(body.bairro == undefined){
      return res.status(400).json({message: 'the field "bairro" is required'});
    }
  
    if(body.bairro == ''){
      return res.status(400).json({message: 'bairro cannot be empty'});
    }
  
    next();
  };
  
  const validateFieldPhoneNumber = (req, res, next) => {
    const { body } = req;
  
    if(body.telefone == undefined){
      return res.status(400).json({message: 'the field "telefone" is required'});
    }
  
    if(body.telefone == ''){
      return res.status(400).json({message: 'telefone cannot be empty'});
    }
  
    next();
  };
  
  const validateFieldProfession = (req, res, next) => {
    const { body } = req;
  
    if(body.profissao == undefined){
      return res.status(400).json({message: 'the field "profissao" is required'});
    }
  
    if(body.profissao == ''){
      return res.status(400).json({message: 'profissao cannot be empty'});
    }
  
    next();
  };
  
  const validateFieldMaritalStatus = (req, res, next) => {
    const { body } = req;
  
    if(body.estadoCivil == undefined){
      return res.status(400).json({message: 'the field "estadoCivil" is required'});
    }
  
    if(body.estadoCivil == ''){
      return res.status(400).json({message: 'estadoCivil cannot be empty'});
    }
  
    next();
  };
  
  const validateFieldWorkplace = (req, res, next) => {
    const { body } = req;
  
    if(body.localTrabalho == undefined){
      return res.status(400).json({message: 'the field "localTrabalho" is required'});
    }
  
    if(body.localTrabalho == ''){
      return res.status(400).json({message: 'localTrabalho cannot be empty'});
    }
  
    next();
  };
  
  const validateFieldFamilyIncome = (req, res, next) => {
    const { body } = req;
  
    if(body.rendaFamiliar == undefined){
      return res.status(400).json({message: 'the field "rendaFamiliar" is required'});
    }
  
    if(body.rendaFamiliar == ''){
      return res.status(400).json({message: 'rendaFamiliar cannot be empty'});
    }
  
    next();
  };
  
  const validateFieldEmail = (req, res, next) => {
    const { body } = req;
  
    if(body.email == undefined){
      return res.status(400).json({message: 'the field "email" is required'});
    }
  
    if(body.email == ''){
      return res.status(400).json({message: 'email cannot be empty'});
    }
  
    next();
  };
  
  const validateFieldUnderage = (req, res, next) => {
    const { body } = req;
  
    if(body.menorIdade == undefined){
      return res.status(400).json({message: 'the field "menorIdade" is required'});
    }
  
    next();
  };
  
  const validateFieldOwnerName = (req, res, next) => {
    const { body } = req;

    if(body.nomeResp == undefined){
        return res.status(400).json({message: 'the field "nomeResp" is required'});
        }

    if(body.menorIdade == true){
        if(body.nomeResp == ''){
        return res.status(400).json({message: 'nomeResp cannot be empty'});
        }
    }
    next();
  };
  
  const validateFieldKinship = (req, res, next) => {
    const { body } = req;
  
    if(body.parentesco == undefined){
      return res.status(400).json({message: 'the field "parentesco" is required'});
    }

    if(body.menorIdade == true){
        if(body.parentesco == ''){
        return res.status(400).json({message: 'parentesco cannot be empty'});
        }
    }
    next();
  };
  
  const validateFieldOwnerRg = (req, res, next) => {
    const { body } = req;
  
    
    if(body.menorIdade == true){
        if(body.rgResp == undefined){
          return res.status(400).json({message: 'the field "rgResp" is required'});
        }
        if(body.rgResp == ''){
            return res.status(400).json({message: 'rgResp cannot be empty'});
        }
    }
    next();
  };
  
  const validateFieldOwnerCpf = (req, res, next) => {
    const { body } = req;
  
    
    if(body.menorIdade == true){
        if(body.cpfResp == undefined){
          return res.status(400).json({message: 'the field "cpfResp" is required'});
        }
        if(body.cpfResp == ''){
        return res.status(400).json({message: 'cpfResp cannot be empty'});
        }
    }
    next();
  };
  
  
  module.exports = {
    validateFieldName,
    validateFieldBirthDate,
    validateFieldschooling,
    validateFieldRg,
    validateFieldCpf,
    validateFieldDistrict,
    validateFieldPhoneNumber,
    validateFieldProfession,
    validateFieldMaritalStatus,
    validateFieldWorkplace,
    validateFieldFamilyIncome,
    validateFieldEmail,
    validateFieldUnderage,
    validateFieldOwnerName,
    validateFieldKinship,
    validateFieldOwnerRg,
    validateFieldOwnerCpf,
};